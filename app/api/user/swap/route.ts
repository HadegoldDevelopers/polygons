import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  try {
    const { user_id, from_symbol, to_symbol, from_amount, to_amount, rate } =
      await req.json();

    // Insert swap history
    await supabaseService.from("swap_history").insert({
      user_id,
      from_symbol,
      to_symbol,
      from_amount,
      to_amount,
      rate,
      status: "confirmed",
    });

    // Perform atomic balance update
    const { error } = await supabaseService.rpc("swap_tokens", {
      p_user_id: user_id,
      p_from_symbol: from_symbol,
      p_to_symbol: to_symbol,
      p_from_amount: from_amount,
      p_to_amount: to_amount,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
 await recordTransaction({
  user_id,
  type: "Swap",
  direction: "swap",
  coin: from_symbol,
  amount: from_amount,
  usd: from_amount,
  status: "confirmed",
  metadata: {
    from_symbol,
    to_symbol,
    from_amount,
    to_amount,
    rate,
  },
});
await createNotification(
  user_id,
  `Swap Completed: You swapped ${from_amount} ${from_symbol} → ${to_amount} ${to_symbol}`
);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
