"use client";
import { useRef } from "react";

import CodeTyping from "@/components/CodeTyping";


export default function DeveloperSection() {
  const scrollRef = useRef(null);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* LEFT — Code Frame */}
        <div>
          <h2 className="text-white font-extrabold uppercase text-[32px] md:text-[42px] mb-6">
            Develop on PlutoChain
          </h2>

          {/* FRAME BOX */}
          <div className="bg-[#141a24] rounded-xl overflow-hidden shadow-xl relative pl-6 pr-8 py-7 md:pl-12 md:pr-12 md:py-12">

            {/* Lines background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full opacity-25 lines-background" />
            </div>

            {/* LEFT bracket corners */}
            <div className="absolute left-3 md:left-8 top-3 md:top-6 bottom-3 md:bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="w-12 h-12 border-l-[10px] border-t-[10px] border-[#FF7900]" />
              <div className="w-12 h-12 border-l-[10px] border-b-[10px] border-[#FF7900]" />
            </div>

            {/* RIGHT bracket corners */}
            <div className="absolute right-3 md:right-8 top-3 md:top-6 bottom-3 md:bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="w-12 h-12 border-r-[10px] border-t-[10px] border-[#FF7900]" />
              <div className="w-12 h-12 border-r-[10px] border-b-[10px] border-[#FF7900]" />
            </div>

            {/* CODE TYPING COMPONENT */}
            <div ref={scrollRef} className="h-[260px] md:h-[360px] overflow-y-auto custom-scrollbar relative">
            <CodeTyping />
            </div>
          </div>
        </div>

        {/* RIGHT — Text + Buttons */}
        <div>
          <h2 className="text-[#FF7900] text-4xl font-extrabold uppercase mb-4">
            Get Started in Minutes
          </h2>

          <p className="text-lg mb-4">
            Our easy to integrate library allows developers to build PlutoChain Apps in minutes.
          </p>

          <p className="text-lg opacity-60 mb-8">
            Don’t miss the chance to build the next generation of blockchain applications.
          </p>

          <a
            href="https://docs.plutochain.io"
            target="_blank"
            className="border border-[#FF7900] px-6 py-3 rounded-lg uppercase font-bold"
          >
            Get Started Now
          </a>

          <h3 className="text-3xl font-extrabold uppercase mt-10">
            Join the Growing Community of Developers
          </h3>

          <div className="flex gap-4 mt-6">
            <a className="bg-[#FF7900] text-black px-8 py-3 rounded-lg font-bold uppercase">
              Buy Now
            </a>
            <a
              href="https://github.com/pluto-chain/plutochain-erc20"
              target="_blank"
              className="border border-[#FF7900] px-8 py-3 rounded-lg font-bold uppercase"
            >
              GitHub
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
