"use client";

export default function Staking() {
  return (
    <section>
      <div className="container">
        <div className="flex items-center pb-10 flex-wrap">

          {/* Left: coin video */}
          <div className="w-full lg:w-1/2 md:p-20">
            <div className="relative w-full overflow-hidden">
              <div className="relative md:block hidden min-h-[578px]">
                <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                  <source src="/videos/coin_animation_compressed-NmvSNoNMkhh17UEJiX7fy95q42VPt8.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Right: steps */}
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4 text-center md:text-left">
              PlutoChain Staking
            </h2>
            <p className="font-[500] text-[18px] leading-[22px] text-center md:text-left">
              PlutoChain has created an awesome new staking system that rewards users who participate the most.
            </p>

            {/* Mobile coin video */}
            <div className="relative w-full overflow-hidden md:hidden block mt-5 min-h-[382px]">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/videos/coin_animation_compressed-NmvSNoNMkhh17UEJiX7fy95q42VPt8.mp4" type="video/mp4" />
              </video>
            </div>

            <ul className="md:my-10 my-6">
              <li>
                <div className="flex items-center mb-4 gap-3">
                  <span className="bg-[#FF7900] text-[#000] text-[20px] uppercase px-[22px] py-2 rounded-[8px] font-[600]">1</span>
                  <p className="uppercase md:text-[22px] text-[18px] font-[600] leading-[20px] md:leading-[25px]">Purchase PlutoChain tokens</p>
                </div>
              </li>
              <li className="bg-black">
                <div className="flex items-center mb-4 gap-3">
                  <span className="bg-[#FF7900] text-[#000] text-[20px] uppercase px-5 py-2 rounded-[8px] bg-opacity-70 font-[600]">2</span>
                  <p className="uppercase md:text-[22px] text-[18px] font-[600] leading-[20px] md:leading-[25px]">Stake your tokens </p>
                  <span className="uppercase bg-[#FF7900] text-[#000] font-[600] px-3 py-[1px] text-[12px] rounded-[4px] text-center bg-opacity-80">soon</span>
                </div>
              </li>
              <li>
                <div className="flex items-center mb-4 gap-3">
                  <span className="bg-[#FF7900] text-[#000] text-[20px] uppercase px-5 py-2 rounded-[8px] bg-opacity-70 font-[600]">3</span>
                  <p className="uppercase md:text-[22px] text-[18px] font-[600] leading-[20px] md:leading-[25px]">Login daily and claim rewards </p>
                  <span className="uppercase bg-[#FF7900] text-[#000] font-[600] px-3 py-[1px] text-[12px] mr-[6px] rounded-[4px] text-center bg-opacity-80">soon</span>
                </div>
              </li>
              <li>
                <div className="flex md:items-center items-start mb-4 gap-3">
                  <span className="border border-[#FF7900] bg-transparent text-[#FF7900] text-[20px] uppercase px-5 py-2 rounded-[8px] font-[600]">+</span>
                  <p className="uppercase md:text-[22px] text-[18px] font-[600] leading-[20px] md:leading-[25px]">Participate in important protocol governance decisions</p>
                </div>
              </li>
            </ul>

            <div className="flex gap-4 items-center pt-6 md:pt-0">
              <a href="#presale" className="bg-[#FF7900] hover:bg-opacity-90 md:w-auto w-full text-center text-[#000] text-[14px] px-8 md:px-16 py-6 sm:py-3 rounded-[8px] font-[800]">
                BUY NOW
              </a>
              <a href="https://plutochain.io/whitepaper.pdf" target="_blank" className="border bg-[transparent] border-[#FF7900] md:w-auto w-full text-center text-[#fff] text-[14px] uppercase px-6 py-3 rounded-[8px] font-[800]">
                Read Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
