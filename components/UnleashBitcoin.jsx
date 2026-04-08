"use client";
import Image from "next/image";

export default function UnleashBitcoin() {
  return (
    <section className="">
      <div className="container">
        <div className="flex items-center md:py-10 flex-wrap">

          <div className="w-full lg:w-1/2 p-4">
            <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4">
              Unleash the Bitcoin Trillion-Dollar Economy
            </h2>
            <p className="font-[600] md:text-[32px] text-[22px] md:leading-[40px]">
              Most Bitcoin in circulation remains unutilized
            </p>

            {/* Astronaut — mobile only */}
            <Image
              alt="astronaut" width={625} height={565}
              className="w-full md:hidden block mt-5"
              src="/unleashc240.jpeg"
            />

            <ul className="md:my-10 my-6">
              {[
                "Laying the foundation for decentralized finance on Bitcoin",
                "Enabling smart contracts on the Bitcoin blockchain",
                "Unlocking new opportunities for value creation and driving the next generation of Bitcoin-based financial systems",
              ].map((text, i) => (
                <li key={i}>
                  <div className="flex items-start mb-4 gap-2">
                    <Image alt="check" width={24} height={24} src="/assets/check.svg" />
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#presale"
              className="bg-[#FF7900] hover:bg-opacity-90 md:inline-block block text-center text-[#000] hover:text-[#000] text-[14px] uppercase px-6 py-3 rounded-[8px] md:px-20 font-[600]"
            >
              BUY Polycogni Capital TOKEN
            </a>
          </div>

          {/* Astronaut — desktop only */}
          <div className="w-full lg:w-1/2 p-4">
            <Image
              alt="astronaut" width={625} height={565}
              className="w-full md:block hidden"
              src="/unleashc240.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}