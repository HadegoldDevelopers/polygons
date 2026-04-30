"use client";

export default function SettingsHeader({ saved }: { saved: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-white">Admin Settings</h1>
        <p className="text-xs text-white/50">
          Configure payment provider keys and global settings.
        </p>
      </div>

      {saved && (
        <span className="text-xs text-emerald-400 font-medium">
          Settings saved
        </span>
      )}
    </div>
  );
}
