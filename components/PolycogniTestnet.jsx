"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: "/icons/total_transactionc390.png",  target: 2294029, label: "Total Transactions",  useImg: true },
  { icon: "/icons/transactiond33f.png",         target: 43200,   label: "Daily Transactions",  useImg: true },
  { icon: "/icons/walletff59.png",              target: 2552,    label: "Wallet Addresses",    useImg: true },
  { icon: null,                             target: 2295594, label: "Total Blocks",        useImg: false },
];

function Counter({ target, started }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = target / 80;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 25);
    return () => clearInterval(t);
  }, [started, target]);
  return <>{val.toLocaleString()}</>;
}

export default function PolycogniTestnet() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="md:py-10" ref={ref}>
      {/* Exact JSX class from source */}
      <section className="jsx-665ac7b44f8795e4 relative">
        <h2 className="jsx-665ac7b44f8795e4 font-[800] text-[36px] md:text-[48px] text-white text-center uppercase pb-2">
          PLUTOCHAIN TESTNET
        </h2>

        {/* testnet-stats-box: has the space background via CSS */}
        <div className="testnet-stats-box relative overflow-hidden pt-8 pb-8">
          <div className="container md:px-0 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 max-w-7xl mx-auto md:px-20">

              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl py-8 md:py-14 pl-8 md:pl-0 flex flex-col md:items-center md:justify-center group transition-all duration-300 ${
                    i === 2 ? "hidden sm:flex" : ""
                  }`}
                >
                  {/* Dark glass card background — inset-5 on md */}
                  <div className="absolute inset-0 md:inset-5 bg-[#000000A0] rounded-2xl backdrop-blur-md" />

                  <div className="relative z-10">
                    {/* Orange icon box */}
                    <div className="bg-[#FF7900] rounded-lg p-2 w-10 mb-1">
                      {stat.useImg ? (
                        <img
                          alt=""
                          width={24}
                          height={24}
                          src={stat.icon}
                          style={{ color: "transparent" }}
                        />
                      ) : (
                        /* Total Blocks — SVG inline from source */
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px">
                          <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z" />
                          <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m69 153.99 187 110 187-110m-187 310v-200" />
                        </svg>
                      )}
                    </div>

                    {/* Number */}
                    <div className="text-[34px] font-[700] text-white text-left">
                      <Counter target={stat.target} started={started} />
                    </div>

                    {/* Label */}
                    <div className="text-[14px] uppercase font-medium text-left">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
