"use client";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  description?: string;
  onChange: (value: string) => void;
}

export default function SettingsField({
  label,
  value,
  placeholder,
  description,
  onChange,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-white/60">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#11111a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
      />

      {description && (
        <p className="text-[11px] text-white/40">{description}</p>
      )}
    </div>
  );
}
