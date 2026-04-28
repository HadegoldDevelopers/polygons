"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function FeaturedIn() {
  const t = useTranslations("featured");

  const logos = [
    { src: "/partners/analytics_insight_logo_hd.webp", w: 228, alt: t("analyticsInsight") },
    { src: "/partners/the_crypto_times_logo_hd.webp",  w: 210, alt: t("cryptoTimes") },
    { src: "/partners/crypto_news_flash_logo_hd.webp", w: 134, alt: t("cryptoNewsFlash") },
    { src: "/partners/coinspeaker_logo_hd.webp",       w: 174, alt: t("coinspeaker") },
    { src: "/partners/coin_gape_logo_hd.webp",         w: 174, alt: t("coinGape") },

    // duplicate for seamless loop
    { src: "/partners/analytics_insight_logo_hd.webp", w: 228, alt: t("analyticsInsight") },
    { src: "/partners/the_crypto_times_logo_hd.webp",  w: 210, alt: t("cryptoTimes") },
    { src: "/partners/crypto_news_flash_logo_hd.webp", w: 134, alt: t("cryptoNewsFlash") },
    { src: "/partners/coinspeaker_logo_hd.webp",       w: 174, alt: t("coinspeaker") },
    { src: "/partners/coin_gape_logo_hd.webp",         w: 174, alt: t("coinGape") },
  ];

  return (
    <section>
      <div className="container">
        <div className="text-center md:mt-10 mb-0 pb-5">
          <h2 className="font-[800] text-[20px] text-[#fff] uppercase">
            {t("title")}
          </h2>
        </div>
      </div>

      <div
        className="overflow-hidden will-change-transform"
        style={{
          WebkitMaskImage:
            "-webkit-linear-gradient(left, transparent 0%, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center marquee-track"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              width={logo.w * 2}
              height={60}
              className="md:mx-11 mx-4 partner-logo"
              style={{ width: logo.w }}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
