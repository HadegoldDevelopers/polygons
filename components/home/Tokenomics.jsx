"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Tokenomics() {
  const t = useTranslations("tokenomics");

  return (
    <section className="lg:pt-10" id="token">
      <div className="container">
        <div className="flex items-center md:py-10 pb-10 flex-wrap">

          <div className="w-full lg:w-1/2 p-4">
            <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4">
              {t("title")}
            </h2>

            <p className="font-[500] text-[18px] leading-[22px]">
              {t("description")}
            </p>

            <div className="flex gap-4 items-center pt-6">
              <Link
                href="/register"
                className="bg-[#FF7900] hover:bg-opacity-90 md:w-auto w-full text-center text-[#000] text-[14px] font-[800] uppercase px-9 py-3 rounded-[8px]"
              >
                {t("buyNow")}
              </Link>

              <Link
                href="/whitepaper/Polycogni_Capital_Whitepaper.pdf"
                target="_blank"
                className="border bg-[transparent] border-[#FF7900] md:w-auto w-full text-center text-[#fff] text-[14px] font-[800] uppercase px-6 py-3 rounded-[8px]"
              >
                {t("whitepaper")}
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-4">
            <Image
              alt="Tokenomics"
              width={410}
              height={600}
              className="w-full max-w-[410px] mx-auto"
              src="/assets/tokenomics.png"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
