"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Logo } from "@/components/ui";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo size="sm" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-white font-medium uppercase text-sm">
          <Link href="/#about"    className="hover:text-[#FF7900]">{t("about")}</Link>
          <Link href="/#features" className="hover:text-[#FF7900]">{t("features")}</Link>
          <Link href="/#token"    className="hover:text-[#FF7900]">{t("token")}</Link>
          <Link href="/#faq"      className="hover:text-[#FF7900]">{t("faq")}</Link>
        </nav>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-white border border-white/30 px-5 py-2 rounded-lg uppercase text-sm hover:border-[#FF7900]"
          >
            {t("dashboard")}
          </Link>
          <Link
            href="/login"
            className="bg-[#FF7900] text-black font-bold px-5 py-2 rounded-lg uppercase text-sm"
          >
            {t("connectWallet")}
          </Link>

          {/* Language Selector */}
          <div className="text-white text-sm uppercase cursor-pointer">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          <nav className="flex flex-col text-white text-lg uppercase p-6 gap-4">
            <Link href="/#about"    onClick={() => setOpen(false)}>{t("about")}</Link>
            <Link href="/#features" onClick={() => setOpen(false)}>{t("features")}</Link>
            <Link href="/#token"    onClick={() => setOpen(false)}>{t("token")}</Link>
            <Link href="/#faq"      onClick={() => setOpen(false)}>{t("faq")}</Link>
            <Link
              href="/dashboard"
              className="border border-white/30 px-5 py-3 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              {t("dashboard")}
            </Link>
            <Link
              href="/login"
              className="bg-[#FF7900] text-black font-bold px-5 py-3 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              {t("connectWallet")}
            </Link>
            <div className="mt-2">
              <LanguageSelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}