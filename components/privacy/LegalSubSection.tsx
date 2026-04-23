import LegalBulletList from "./LegalBulletList";

export default function LegalSubSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-[#FF7900] font-bold text-sm mb-2">{title}</p>
      <LegalBulletList items={items} />
    </div>
  );
}
