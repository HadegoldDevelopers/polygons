"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function UnleashBitcoin() {
  const t = useTranslations("unleash");

  const points = [t("point1"), t("point2"), t("point3")];

  return (
    <section className="">
      <div className="container">
        <div className="flex items-center md:py-10 flex-wrap">

          <div className="w-full lg:w-1/2 p-4">
            <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4">
              {t("title")}
            </h2>

            <p className="font-[600] md:text-[32px] text-[22px] md:leading-[40px]">
              {t("subtitle")}
            </p>

            {/* Astronaut — mobile only */}
            <Image
              alt="astronaut"
              width={625}
              height={565}
              className="w-full md:hidden block mt-5"
              src="/assets/unleashed.png"
            />

            <ul className="md:my-10 my-6">
              {points.map((text, i) => (
                <li key={i}>
                  <div className="flex items-start mb-4 gap-2">
                    <Image alt="check" width={24} height={24} src="/assets/check.svg" />
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="bg-[#FF7900] hover:bg-opacity-90 md:inline-block block text-center text-[#000] hover:text-[#000] text-[14px] uppercase px-6 py-3 rounded-[8px] md:px-20 font-[600]"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Astronaut — desktop only */}
          <div className="w-full lg:w-1/2 p-4">
            <Image
              alt="astronaut"
              width={625}
              height={565}
              className="w-full md:block hidden"
              src="/assets/unleashed.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
