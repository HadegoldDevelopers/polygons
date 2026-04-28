"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function DevelopmentPhases() {
  const t = useTranslations("phases");
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    }, { threshold: 0.2 });

    cardRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const phases = [
    { n: 1, items: [t("p1i1"), t("p1i2"), t("p1i3")], active: false },
    { n: 2, items: [t("p2i1"), t("p2i2"), t("p2i3")], active: true  },
    { n: 3, items: [t("p3i1"), t("p3i2"), t("p3i3")], active: false },
    { n: 4, items: [t("p4i1"), t("p4i2"), t("p4i3")], active: false },
  ];

  return (
    <section className="lg:pt-10 roadmap" id="roadmap">
      <div className="container">
        <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4 text-center">
          {t("title")}
          <span className="text-[#FFF] text-[20px] md:text-[24px] font-[600] align-top relative top-[-0.3em] md:top-[-0.5em]">*</span>
        </h2>

        <div className="flex pb-1 pt-5 flex-wrap">
          {phases.map((phase, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className="w-full lg:w-3/12 p-4 md:px-2 phase-card lg:opacity-100 lg:translate-y-0 opacity-0 translate-y-20 transition-all duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`bg-[#282727] border ${phase.active ? "border-[#FF7900]" : "border-transparent"} bg-opacity-10 rounded-lg p-4 h-full`}>
                <span className="bg-[#FF7900] text-[#000] text-[20px] uppercase px-5 py-2 rounded-[8px] font-[600]">
                  {t("phase")} {phase.n}
                </span>

                <div className="bg-[#000] rounded-lg p-3 mt-4">
                  <ul className="list-disc pl-5">
                    {phase.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-right text-sm text-[#909090] pr-5 md:pr-2 pb-8">
          {t("subject")}
        </p>
      </div>
    </section>
  );
}
