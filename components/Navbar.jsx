"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="PlutoChain" className="h-10" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-white font-medium uppercase text-sm">
          <a href="#about" className="hover:text-[#FF7900]">About</a>
          <a href="#features" className="hover:text-[#FF7900]">Features</a>
          <a href="#token" className="hover:text-[#FF7900]">Token</a>
          <a href="#faq" className="hover:text-[#FF7900]">FAQ</a>
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
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#token" onClick={() => setOpen(false)}>Token</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <a href="#balance" onClick={() => setOpen(false)}>Check Balance</a>
            <a href="#academy" onClick={() => setOpen(false)}>Academy</a>

            <a
              href="#dashboard"
              className="border border-white/30 px-5 py-3 rounded-lg text-center"
            >
              Dashboard
            </a>

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
