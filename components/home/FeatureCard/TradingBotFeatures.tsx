"use client";

import { FeatureCard } from "./FeatureCard";

export default function TradingBotFeatures() {
  const items = [
    {
      title: "TRADING BOT LICENSES",
      text: "Users can purchase AI powered bot licenses for automated trading across various markets.",
      img: "/assets/tradingbot.png",
    },
    {
      title: "PROFIT SHARING MODEL",
      text: "Earn passive income from the successful trades executed by your AI trading bots.",
      img: "/assets/tradinghuman.png",
    },
    {
      title: "NFT BASED BOT OWNERSHIP",
      text: "Users can buy, sell, and trade AI bot licenses as NFTs on our marketplace, ensuring true asset ownership.",
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
