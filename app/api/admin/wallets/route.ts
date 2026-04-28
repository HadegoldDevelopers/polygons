// app/api/admin/wallets/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

// ── GET — fetch all wallets ────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify admin
    const { data: profile } = await supabaseService
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ── Extract params from req.url ────────────────────────────────
    const { searchParams } = new URL(req.url);
    const page   = Math.max(Number(searchParams.get("page")  ?? 1),   1);
    const limit  = Math.min(Number(searchParams.get("limit") ?? 50), 200);
    const coin   = searchParams.get("coin") ?? "";
    const from   = (page - 1) * limit;
    const to     = from + limit - 1;

    // ── Fetch wallets joined with profiles ─────────────────────────
    // wallets_with_value doesn't have profile info so we join manually
    let query = supabaseService
      .from("wallets")
      .select(`
        id,
        user_id,
        symbol,
        amount,
        address,
        created_at,
        profiles(name, email)
      `, { count: "exact" })
      .order("amount", { ascending: false })
      .range(from, to);

    if (coin) query = query.eq("symbol", coin);

    const { data: wallets, error, count } = await query;

if (error) {
  console.error("GET wallets error:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}

    // Get price data for each unique symbol
    const symbols = [...new Set((wallets ?? []).map((w: any) => w.symbol))];

    const { data: priceData } = await supabaseService
      .from("wallets_with_value")
      .select("symbol, price, change_24h, usd_value")
      .in("symbol", symbols)
      .limit(symbols.length);

    // Build price lookup map
    const priceMap: Record<string, { price: number; change_24h: number }> = {};
    (priceData ?? []).forEach((p: any) => {
      priceMap[p.symbol] = { price: p.price, change_24h: p.change_24h };
    });

    // Merge price into each wallet
    const enriched = (wallets ?? []).map((w: any) => {
      const pm       = priceMap[w.symbol] ?? { price: 0, change_24h: 0 };
      const usdValue = w.symbol === "USD" || w.symbol === "USDT"
        ? w.amount
        : w.amount * pm.price;

      return {
        ...w,
        price:      pm.price,
        change_pct: pm.change_24h,
        usd_value:  usdValue,
      };
    });

    return NextResponse.json({
      wallets: enriched,
      total:   count ?? 0,
      page,
      limit,
      hasMore: (wallets?.length ?? 0) === limit,
    });

  } catch (err) {
    console.error("Admin wallets GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── PATCH — update wallet amount ───────────────────────────────────
export async function PATCH(req: Request) {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify admin
    const { data: profile } = await supabaseService
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { wallet_id, action, amount, note } = await req.json();

    if (!wallet_id || !action || amount === undefined) {
      return NextResponse.json(
        { error: "Missing wallet_id, action or amount" },
        { status: 400 }
      );
    }

    if (!["set", "add", "subtract"].includes(action)) {
      return NextResponse.json(
        { error: "Action must be set, add or subtract" },
        { status: 400 }
      );
    }

    if (Number(amount) < 0) {
      return NextResponse.json(
        { error: "Amount must be positive" },
        { status: 400 }
      );
    }

    // ── Get current wallet ─────────────────────────────────────────
    // Always read/write from base wallets table — not the view
    const { data: wallet, error: walletError } = await supabaseService
      .from("wallets")
      .select("*")
      .eq("id", wallet_id)
      .single();

    if (walletError || !wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // Calculate new amount
    const numAmount = Number(amount);
    let newAmount: number;

    if (action === "set")      newAmount = numAmount;
    else if (action === "add") newAmount = wallet.amount + numAmount;
    else                       newAmount = Math.max(0, wallet.amount - numAmount);

    const diff = newAmount - wallet.amount;

    // ── Write to base wallets table ────────────────────────────────
    const { error: updateError } = await supabaseService
      .from("wallets")
      .update({ amount: newAmount })
      .eq("id", wallet_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // ── Log ────────────────────────────────────────────────────────
    await supabaseService.from("admin_logs").insert({
      admin_id:     user.id,
      action:       `wallet_${action}`,
      target_table: "wallets",
      target_id:    wallet_id,
      details: {
        user_id:    wallet.user_id,
        symbol:     wallet.symbol,
        old_amount: wallet.amount,
        new_amount: newAmount,
        diff,
        note:       note ?? null,
      },
    });

    // ── Record transaction ─────────────────────────────────────────
    if (diff !== 0) {
      const direction = diff > 0 ? "in" : "out";
      const type = diff > 0 ? "Deposit" : "Withdraw";

      // EXACT SAME PATTERN AS YOUR SAMPLE
      await recordTransaction({
        user_id: wallet.user_id,
        type,
        direction,
        coin: wallet.symbol,
        amount: Math.abs(diff),
        usd: null,
        hash: `admin_adj_${wallet_id}_${Date.now()}`,
        status: "confirmed",
        gateway: "Admin",
        metadata: { note: note ?? null },
      });

      // EXACT SAME PATTERN AS YOUR SAMPLE
      const message =
        diff > 0
          ? `💰 ${Math.abs(diff).toLocaleString()} ${wallet.symbol} has been added to your wallet by admin.${note ? ` Note: ${note}` : ""}`
          : `📤 ${Math.abs(diff).toLocaleString()} ${wallet.symbol} has been deducted from your wallet by admin.${note ? ` Note: ${note}` : ""}`;

      await createNotification(wallet.user_id, message);
    }

    return NextResponse.json({
      success:    true,
      old_amount: wallet.amount,
      new_amount: newAmount,
      diff,
      symbol:     wallet.symbol,
    });

  } catch (err) {
    
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}