import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  try {
    const [
      usersRes,
      txRes,
      stakingRes,
      withdrawalRes,
    ] = await Promise.all([
      supabaseService
        .from("profiles")
        .select("id, created_at", { count: "exact" }),

      supabaseService
        .from("transactions")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(50),

      supabaseService
        .from("staking_positions")
        .select("id, amount", { count: "exact" })
        .eq("status", "active"),

      supabaseService
        .from("withdraw_requests")
        .select("id", { count: "exact" })
        .eq("status", "pending"),
    ]);

    const allTx = txRes.data ?? [];

    const deposits = allTx.filter((t) => t.type === "Deposit");
    const withdrawals = allTx.filter((t) => t.type === "Withdraw");

    const totalVolume = allTx.reduce((s, t) => s + (t.usd ?? 0), 0);
    const totalDeposits = deposits.reduce((s, t) => s + (t.usd ?? 0), 0);
    const totalWithdrawals = withdrawals.reduce((s, t) => s + (t.usd ?? 0), 0);

    const totalStaked = (stakingRes.data ?? []).reduce(
      (s, p) => s + (p.amount ?? 0),
      0
    );

    const today = new Date().toISOString().split("T")[0];

    const newUsersToday = (usersRes.data ?? []).filter((u) =>
      u.created_at?.startsWith(today)
    ).length;

    return Response.json({
      stats: {
        totalUsers: usersRes.count ?? 0,
        totalVolume,
        totalDeposits,
        totalWithdrawals,
        pendingWithdrawals: withdrawalRes.count ?? 0,
        activeStakes: stakingRes.count ?? 0,
        totalStaked,
        newUsersToday,
      },
      recentTx: allTx.slice(0, 8),
    });
  } catch (error) {
    return Response.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}