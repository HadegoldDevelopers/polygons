"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
        <Link href="/" className="text-white font-bold uppercase text-lg">
          <Image src="/logo.jpg" alt="Polycogni Logo" className="object-contain" width={100}
  height={100}/>
        </Link>
          
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-white font-medium uppercase text-sm">
          <Link href="/#about" className="hover:text-[#FF7900]">About</Link>
          <Link href="/#features" className="hover:text-[#FF7900]">Features</Link>
          <Link href="/#token" className="hover:text-[#FF7900]">Token</Link>
          <Link href="/#faq" className="hover:text-[#FF7900]">FAQ</Link>
          <Link href="/pricing" className="hover:text-[#FF7900]">Pricing</Link>
          <a href="#balance" className="hover:text-[#FF7900]">Check Balance</a>
          <a href="#academy" className="hover:text-[#FF7900]">Academy</a>
        </nav>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#dashboard"
            className="text-white border border-white/30 px-5 py-2 rounded-lg uppercase text-sm hover:border-[#FF7900]"
          >
            Dashboard
          </a>

          <button className="bg-[#FF7900] text-black font-bold px-5 py-2 rounded-lg uppercase text-sm">
            Connect Wallet
          </button>

          {/* Language Selector */}
          <div className="text-white text-sm uppercase cursor-pointer">
            EN
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
            <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
            <Link href="/#token" onClick={() => setOpen(false)}>Token</Link>
            <Link href="/#faq" onClick={() => setOpen(false)}>FAQ</Link>
            <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="#balance" onClick={() => setOpen(false)}>Check Balance</Link>
            <Link href="#academy" onClick={() => setOpen(false)}>Academy</Link>

            <Link
              href="#dashboard"
              className="border border-white/30 px-5 py-3 rounded-lg text-center"
            >
              Dashboard
            </Link>

            <button className="bg-[#FF7900] text-black font-bold px-5 py-3 rounded-lg">
              Connect Wallet
            </button>

            <div className="text-white text-sm uppercase mt-2">EN</div>
          </nav>
        </div>
      )}
    </header>
  );
}
