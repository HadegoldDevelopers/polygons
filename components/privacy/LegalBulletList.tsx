export default function LegalBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-white/65 text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
