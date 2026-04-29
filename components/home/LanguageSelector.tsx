"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const LANGS = [
  { code: "en", label: "English", flag: "/assets/flags/gb.svg" },
  { code: "pt", label: "Português", flag: "/assets/flags/pt.svg" },
  { code: "es", label: "Español", flag: "/assets/flags/es.svg" },
  { code: "fr", label: "Français", flag: "/assets/flags/fr.svg" },
  { code: "it", label: "Italiano", flag: "/assets/flags/it.svg" },
  { code: "bg", label: "Български", flag: "/assets/flags/bg.svg" },
  { code: "el", label: "Ελληνικά", flag: "/assets/flags/el.svg" },
  { code: "pl", label: "Polski", flag: "/assets/flags/pl.svg" },
  { code: "tr", label: "Türkçe", flag: "/assets/flags/tr.svg" }
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(lang: string) {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
    setOpen(false);
  }

  const current = LANGS.find(l => l.code === locale);

  return (
    <div className="relative">
      {/* Trigger */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Image src={current?.flag || "/assets/flags/gb.svg"} width={20} height={20} alt="" />
        <span className="uppercase text-white">{locale}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 bg-black border border-[#FF7900] rounded-lg w-40 z-50">
          {LANGS.map(lang => (
            <div
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#FF790020] cursor-pointer text-white text-sm font-bold uppercase"
            >
              <Image src={lang.flag} width={20} height={20} alt={lang.label} />
              <span>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
