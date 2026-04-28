"use client";

import { FeatureCard } from "./FeatureCard";
import { useTranslations } from "next-intl";

export default function TradingBotFeatures() {
  const t = useTranslations("tradingBots");

  const items = [
    {
      title: t("title1"),
      text: t("text1"),
      img: "/assets/tradingbot.png",
    },
    {
      title: t("title2"),
      text: t("text2"),
      img: "/assets/tradinghuman.png",
    },
    {
      title: t("title3"),
      text: t("text3"),
      img: "/assets/ai_bot.png",
    },
  ];

  return (
    <section className="py-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <FeatureCard
            key={i}
            title={item.title}
            text={item.text}
            img={item.img}
          />
        ))}
      </div>
    </section>
  );
}
