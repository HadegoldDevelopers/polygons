import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, action, tx_hash, admin_note } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch withdrawal request
    const { data: request, error: reqError } = await supabaseService
      .from("withdraw_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (reqError || !request) {
      return NextResponse.json(
        { error: "Withdrawal request not found" },
        { status: 404 }
      );
    }

    // Prevent double-processing
    if (request.status !== "pending") {
      return NextResponse.json(
        { error: "Request already processed" },
        { status: 400 }
      );
    }

    // Update withdrawal request
    const { error: updateError } = await supabaseService
      .from("withdraw_requests")
      .update({
        status: action,
        tx_hash: action === "approved" ? tx_hash : null,
        admin_note: admin_note ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // If approved → deduct wallet + log transaction + notify
    if (action === "approved") {
      // Fetch wallet
      const { data: wallet } = await supabaseService
        .from("wallets_with_value")
        .select("*")
        .eq("user_id", request.user_id)
        .eq("symbol", request.token)
        .single();

      if (wallet) {
        await supabaseService
          .from("wallets_with_value")
          .update({
            amount: Math.max(0, wallet.amount - request.amount),
          })
          .eq("id", wallet.id);
      }

      // Log transaction
  await recordTransaction({
    user_id: request.user_id,
    type: "Withdraw",
    direction: "out",
    coin: request.token,
    amount: request.amount,
    usd: request.usd_value ?? 0,
    hash: tx_hash || request.id,
  });

  // Notify user
  await createNotification(
    request.user_id,
    `Withdrawal of ${request.amount} ${request.token} approved!`
  );
}

if (action === "rejected") {
  await createNotification(
    request.user_id,
    `Withdrawal of ${request.amount} ${request.token} was rejected.${
      admin_note ? ` Reason: ${admin_note}` : ""
    }`
  );
}

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Withdrawal action error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
