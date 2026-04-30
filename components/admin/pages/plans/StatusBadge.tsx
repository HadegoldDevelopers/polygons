export default function StatusBadge({ status }: { status: string }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold";

  if (status === "active")
    return (
      <span className={`${base} bg-emerald-500/15 text-emerald-400`}>
        ● Active
      </span>
    );

  if (status === "completed")
    return (
      <span className={`${base} bg-sky-500/15 text-sky-400`}>
        ● Completed
      </span>
    );

  if (status === "cancelled")
    return (
      <span className={`${base} bg-rose-500/15 text-rose-400`}>
        ● Cancelled
      </span>
    );

  return (
    <span className={`${base} bg-zinc-500/15 text-zinc-300`}>
      ● {status}
    </span>
  );
}
