"use client";

import Image from "next/image";

interface FeatureCardProps {
  title: string;
  text: string;
  img: string;
}

export function FeatureCard({ title, text, img }: FeatureCardProps) {
  return (
    <div className="bg-[#0d0d0d] border border-[#FF7900]/30 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
      <Image
        src={img}
        alt={title}
        width={500}
        height={500}
        className="rounded-lg mb-4"
      />

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      <p className="text-white/70 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
