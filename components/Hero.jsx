"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const words = ["DEFI", "AI", "GAMING", "NFTS", "MEMECOINS", "EVERYTHING"];
  const [index, setIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      setItemHeight(measureRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">

      {/* Background Video */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-28 md:pt-40">

        {/* HEADLINE BLOCK */}
        <div className="flex flex-col gap-4 md:gap-5">

          {/* LINE 1 */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4">

            {/* BUILD */}
            <h1 className="text-white font-extrabold uppercase text-[32px] md:text-[70px] leading-none bg-white/10 backdrop-blur-xl px-3 md:px-4 py-2 rounded-lg whitespace-nowrap">
              Build
            </h1>

            {/* ROTATING WORD */}
            <div
              className="bg-white/10 backdrop-blur-xl px-3 md:px-4 py-2 rounded-lg overflow-hidden"
              style={{ height: itemHeight > 0 ? `${itemHeight}px` : "auto" }}
            >
              {itemHeight === 0 && (
                <div
                  ref={measureRef}
                  className="text-[#FF7900] font-extrabold uppercase text-[32px] md:text-[70px] leading-tight opacity-0 absolute"
                >
                  {words[0]}
                </div>
              )}

              <div
                className="transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateY(-${index * (itemHeight || 0)}px)` }}
              >
                {words.map((word, i) => (
                  <div
                    key={i}
                    className="text-[#FF7900] font-extrabold uppercase text-[32px] md:text-[70px] leading-tight"
                    style={{ height: itemHeight > 0 ? `${itemHeight}px` : "auto" }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LINE 2 */}
          <h1 className="text-white font-extrabold uppercase text-[32px] md:text-[70px] leading-none bg-white/10 backdrop-blur-xl px-3 md:px-4 py-2 rounded-lg w-fit">
            on Bitcoin
          </h1>
        </div>

        {/* SUBHEADLINE */}
        <p className="text-white max-w-xl mt-6 md:mt-10 text-base md:text-xl font-semibold">
          Polycogni Capital is the First Hybrid Layer 2 Blockchain that introduces smart contracts to Bitcoin.
        </p>

        {/* CTA BUTTON */}
        <Link
          href="/register"
          className="inline-flex items-center gap-2 mt-8 md:mt-10 bg-[#FF7900] text-black font-bold px-8 md:px-10 py-3 md:py-4 rounded-lg uppercase shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        >
          REGISTER TO <span className="font-extrabold">Swap</span>
        </Link>

        {/* LISTED ON */}
        <div className="mt-8 md:mt-10">
          <p className="text-white text-xs md:text-sm font-semibold mb-2">We are listed on</p>
          <img
            src="/coinmarketcap-logo-black3bef.png"
            alt="CoinMarketCap"
            className="h-6 md:h-8 invert opacity-90"
          />
        </div>

        {/* AUDIT BADGES */}
        <div className="flex gap-4 md:gap-6 mt-6 md:mt-8">
          <img src="/sp-horizontala1ee.png" className="h-10 md:h-14" alt="SolidProof" />
          <img src="/quill-horizontalc1e1.png" className="h-10 md:h-14" alt="QuillAudits" />
        </div>
      </div>
    </section>
  );
}
