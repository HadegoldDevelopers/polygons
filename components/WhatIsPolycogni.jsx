"use client";
import { useState, useEffect, useRef } from "react";

const cards = [
  {
    title: "Smart Contracts",
    video: "/videos/pluto_card_compressed.mp4",
    poster: "/frames/smart-contracts-frame.webp",
    features: ["EVM Compatible", "Scalable", "Generic"],
  },
  {
    title: "Develop",
    video: "/videos/pluto_gear_compressed.mp4",
    poster: "/frames/develop-frame.webp",
    features: ["DeFi", "Artificial Intelligence", "Gaming"],
  },
  {
    title: "Presale",
    video: "/videos/pluto_rocket_compressed.mp4",
    poster: "/frames/presale-frame.webp",
    features: ["Self-Custodial", "Audited Contract", "Finished Product"],
  },
  {
    title: "Staking",
    video: "/videos/pluto_chest_compressed.mp4",
    poster: "/frames/staking-frame.webp",
    features: ["Instant Staking", "Easy to Use", "Governance Feature"],
  },
  {
    title: "Polycogni Capital Token",
    video: "/videos/pluto_hand_compressed.mp4",
    poster: "/frames/pluto-token-frame.webp",
    features: ["Instant Finality", "Lightning Fast", "Governance Rights"],
  },
  {
    title: "Ecosystem",
    video: "/videos/pluto_ecosystem_compressed.mp4",
    poster: "/frames/ecosystem-frame.webp",
    features: ["Builders Program", "Interoperability", "Bitcoin L2"],
  },
];

const total = cards.length;

export default function WhatIsPolycogni() {
  const [active, setActive] = useState(1);
  const [animating, setAnimating] = useState(false);

  const go = (newIndex) => {
    if (animating) return;
    const wrapped = ((newIndex % total) + total) % total;
    setAnimating(true);
    setActive(wrapped);
    setTimeout(() => setAnimating(false), 400);
  };

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  return (
    <section className="w-full py-16 md:py-28 bg-black" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-12">

        {/* Heading */}
        <h2
          className="text-white text-center font-black uppercase mb-4"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(32px, 6vw, 64px)",
          }}
        >
          WHAT IS POLYCOGNI?
        </h2>

        <p className="text-white/60 text-center max-w-2xl mx-auto mb-12 text-base leading-relaxed">
          Polycogni is a cryptocurrency project that seeks to unlock the full potential of the
          Bitcoin blockchain by bringing smart contracts and decentralized applications to Bitcoin.
        </p>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-3 md:gap-5">

          {/* LEFT ARROW */}
          <button
            onClick={() => go(active - 1)}
            disabled={animating}
            className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl text-black font-black text-xl bg-[#FF7900] hover:opacity-80 disabled:opacity-40 transition"
          >
            ←
          </button>

          {/* TRACK */}
          <div className="flex items-center justify-center gap-3 md:gap-5 flex-1 max-w-5xl overflow-hidden">

            {/* LEFT CARD — hidden on mobile */}
            <div
              className="hidden md:block flex-shrink-0 cursor-pointer select-none transition-all duration-500"
              style={{ width: "26%", opacity: 0.55, transform: "scale(0.9)" }}
              onClick={() => go(active - 1)}
            >
              <Card key={`left-${leftIdx}`} card={cards[leftIdx]} isActive={false} />
            </div>

            {/* CENTER CARD — full width on mobile */}
            <div
              className="flex-shrink-0 transition-all duration-500 w-full md:w-auto"
              style={{
                width: "100%",
                maxWidth: "380px",
                opacity: 1,
                transform: "scale(1)",
              }}
            >
              <Card key={`center-${active}`} card={cards[active]} isActive={true} />
            </div>

            {/* RIGHT CARD — hidden on mobile */}
            <div
              className="hidden md:block flex-shrink-0 cursor-pointer select-none transition-all duration-500"
              style={{ width: "26%", opacity: 0.55, transform: "scale(0.9)" }}
              onClick={() => go(active + 1)}
            >
              <Card key={`right-${rightIdx}`} card={cards[rightIdx]} isActive={false} />
            </div>

          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => go(active + 1)}
            disabled={animating}
            className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl text-black font-black text-xl bg-[#FF7900] hover:opacity-80 disabled:opacity-40 transition"
          >
            →
          </button>

        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "28px" : "10px",
                height: "10px",
                background: active === i ? "#FF7900" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* CARD COMPONENT */
function Card({ card, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {});
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden w-full h-full flex flex-col"
      style={{
        background: isActive ? "rgba(255,121,0,0.07)" : "rgba(255,255,255,0.04)",
        border: isActive
          ? "2px solid #FF7900"
          : "1px solid rgba(255,255,255,0.12)",
        transition: "border 0.3s, background 0.3s",
      }}
    >
      {/* Title */}
      <div className="px-4 pt-5 pb-2 text-center">
        <h3
          className="text-white font-bold"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: isActive ? "clamp(16px, 4vw, 22px)" : "clamp(13px, 3vw, 18px)",
          }}
        >
          {card.title}
        </h3>
      </div>

      {/* Video */}
      <div className="relative mx-3 mb-3 rounded-xl overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={card.poster}
        >
          <source src={card.video} type="video/mp4" />
        </video>

        {isActive && (
          <>
            <span className="absolute top-2 left-2 w-5 h-5 border-t-[3px] border-l-[3px] border-[#FF7900]" />
            <span className="absolute top-2 right-2 w-5 h-5 border-t-[3px] border-r-[3px] border-[#FF7900]" />
            <span className="absolute bottom-2 left-2 w-5 h-5 border-b-[3px] border-l-[3px] border-[#FF7900]" />
            <span className="absolute bottom-2 right-2 w-5 h-5 border-b-[3px] border-r-[3px] border-[#FF7900]" />
          </>
        )}
      </div>

      {/* Features */}
      <div className="flex flex-col px-3 pb-4 flex-1 justify-center">
        {card.features.map((f, i) => (
          <div
            key={i}
            className="text-center text-white/80 font-semibold py-2"
            style={{
              fontSize: isActive ? "13px" : "11px",
              background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
              borderBottom: i < card.features.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
