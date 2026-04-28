"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WhyPolycogni() {
  const t = useTranslations("why");

  const features = [
    { img: "/assets/wh1.png", title: t("scalability"),       desc: t("scalabilityDesc") },
    { img: "/assets/wh2.png", title: t("lowCost"),           desc: t("lowCostDesc") },
    { img: "/assets/wh3.png", title: t("evm"),               desc: t("evmDesc") },
    { img: "/assets/wh4.png", title: t("trillion"),          desc: t("trillionDesc") },
  ];

  return (
    <section className="pt-10" id="features">
      <div className="container">
        <h2 className="font-[800] md:text-[62px] text-[40px] text-[#FFFFFF] uppercase md:leading-[75px] leading-[40px] mb-4 text-center">
          {t("title")}
        </h2>

        <div className="flex pb-4 flex-wrap pt-5">
          {features.map((f, i) => (
            <div key={i} className="w-1/2 lg:w-3/12 p-4 md:px-6 px-4 text-center">
              <Image
                alt={`wh${i + 1}`}
                width={80}
                height={80}
                className="w-[80px] h-[80px] mb-4 mx-auto"
                src={f.img}
              />
              <h4 className="font-[800] text-[20px] leading-[24px] mb-3 text-[#FF7900]">
                {f.title}
              </h4>
              <p className="font-[500] text-[14px] leading-[18px] text-[#fff]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:justify-center gap-4 pb-10 pt-6 px-4 md:px-0">
          <Link
            href="/register"
            className="bg-[#FF7900] hover:bg-opacity-90 text-[#000000] hover:text-[#000000] text-[14px] font-[800] uppercase px-16 py-3.5 rounded-[8px] text-center"
          >
            {t("buyNow")}
          </Link>

          <Link
            href="/whitepaper/Polycogni_Capital_Whitepaper.pdf"
            target="_blank"
            className="border border-[#FF7900] text-[#FFF] md:text-[#FF7900] hover:text-[#FFFFFF] text-[14px] font-[800] uppercase px-7 py-3.5 rounded-[8px] text-center"
          >
            {t("readWhitepaper")}
          </Link>
        </div>
      </div>
    </section>
  );
}
