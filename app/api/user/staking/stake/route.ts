import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  try {
    const supabase = await supabaseServer();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { coin, amount, term_id, plan_id } = await req.json();

    if (!coin || !amount || !term_id) {
      return NextResponse.json(
        { error: "Missing coin, amount or term_id" },
        { status: 400 }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // Fetch staking term
    // ─────────────────────────────────────────────
    const { data: term, error: termError } = await supabaseService
      .from("staking_terms")
      .select("*")
      .eq("id", term_id)
      .eq("is_active", true)
      .single();

    if (termError || !term) {
      return NextResponse.json({ error: "Invalid staking term" }, { status: 400 });
    }

    // ─────────────────────────────────────────────
    // Validate staking plan (optional)
    // ─────────────────────────────────────────────
    if (plan_id) {
      const { data: plan } = await supabaseService
        .from("staking_plans")
        .select("min_deposit, max_deposit")
        .eq("id", plan_id)
        .single();

      if (plan) {
        const usdAmount = Number(amount);

        if (plan.min_deposit && usdAmount < plan.min_deposit) {
          return NextResponse.json(
            { error: `Minimum deposit for this plan is $${plan.min_deposit}` },
            { status: 400 }
          );
        }

        if (plan.max_deposit && usdAmount > plan.max_deposit) {
          return NextResponse.json(
            { error: `Maximum deposit for this plan is $${plan.max_deposit}` },
            { status: 400 }
          );
        }
      }
    }

    // ─────────────────────────────────────────────
    // Check wallet balance
    // ─────────────────────────────────────────────
    const { data: wallet } = await supabaseService
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .eq("symbol", coin)
      .single();

    if (!wallet) {
      return NextResponse.json(
        { error: `You don't have a ${coin} wallet` },
        { status: 400 }
      );
    }

    if (wallet.amount < Number(amount)) {
      return NextResponse.json(
        { error: `Insufficient ${coin} balance. Available: ${wallet.amount}` },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // Calculate end date
    // ─────────────────────────────────────────────
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + term.months * 30 * 86400000);

    // ─────────────────────────────────────────────
    // Deduct from wallet
    // ─────────────────────────────────────────────
    const { data: updatedWallet, error: updateError } = await supabaseService
  .from("wallets")
  .update({
    amount: wallet.amount - Number(amount),
  })
  .eq("user_id", user.id)
  .eq("symbol", coin)
  .select()
  .single();

console.log("UPDATED WALLET:", updatedWallet, updateError);



    // ─────────────────────────────────────────────
    // Create staking position
    // ─────────────────────────────────────────────
    const { data: position, error: posError } = await supabaseService
  .from("staking_positions")
  .insert({
    user_id: user.id,
    coin,
    amount: Number(amount),
    term_id,
    apr_snapshot: term.apr, // required
    start_at: startDate.toISOString(),
    end_at: endDate.toISOString(),
    status: "active",
    last_accrued_at: startDate.toISOString(),
    accrued_reward: 0,
    claimed_reward: 0,
  })
  .select()
  .single();


    if (posError) {
      // refund wallet
      await supabaseService
        .from("wallets")
        .update({ amount: wallet.amount })
        .eq("id", wallet.id);

      return NextResponse.json(
        { error: "Failed to create staking position" },
        { status: 500 }
      );
    }

    // ─────────────────────────────────────────────
    // Create transaction record
    // ─────────────────────────────────────────────
    await supabaseService.from("transactions").insert({
      user_id: user.id,
      type: "Staking",
      coin,
      amount: Number(amount),
      usd: 0, // no price column in wallet
      status: "confirmed",
      direction: "out",
      hash: `stake_${position.id}`,
      created_at: new Date().toISOString(),
    });

    // ─────────────────────────────────────────────
    // Notification
    // ─────────────────────────────────────────────
    await createNotification(
       user.id,
      `🔒 Successfully staked ${amount} ${coin} for ${term.name} at ${term.apr}% APR.`
    );


    return NextResponse.json({
      success: true,
      position,
      message: `Successfully staked ${amount} ${coin} for ${term.name}`,
    });

  } catch (err) {
    console.error("Stake error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
