"use client";

export default function HowToBuy() {
  const steps = [
    {
      n: "1", title: "Connect Your Wallet",
      desc: `Go to Uniswap and click "Connect Wallet" and choose your preferred wallet and follow the prompts to connect.`,
    },
    {
      n: "2", title: "Swap for PLUTO",
      desc: `Select Ethereum as the input currency and enter the amount you want to spend, then select PLUTO as the output currency and review the swap details and click "Swap".`,
    },
    {
      n: "3", title: "Confirm the Transaction",
      desc: "Review the transaction details and confirm the swap, then wait for the transaction to process and receive your PLUTO tokens",
    },
  ];

  return (
    <section className="lg:pt-10">
      <div className="container">
        <div className="flex md:flex-row flex-col-reverse items-center pb-10 flex-wrap">

          {/* Image */}
          <div className="w-full lg:w-1/2 p-10 pb-0 md:pb-20 md:p-20">
            <img
              alt="How to buy" width={800} height={600}
              className="w-full min-h-[295px] md:min-h-[520px] object-cover rounded-[10px]"
              src="/how_to_buy_static7f6c.jpeg"
            />
          </div>

          {/* Steps */}
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4">
              How to Buy
            </h2>
            <ul className="md:my-10 my-6">
              {steps.map((step) => (
                <li key={step.n}>
                  <div className="flex items-start md:items-center mb-4 gap-3">
                    <span className="text-[20px] font-[800] uppercase px-5 py-2 rounded-[8px] bg-[#FF7900] text-[#000] flex-shrink-0">
                      {step.n}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="md:text-[22px] text-[18px] font-[800] uppercase rounded-[8px] text-[#FF7900]">
                        {step.title}
                      </h3>
                      <p className="uppercase md:text-[15px] text-[12px] font-[600] leading-[20px] md:leading-[25px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 items-center">
              <a href="#presale" className="bg-[#FF7900] hover:bg-opacity-90 md:w-auto w-full text-center text-[#000] text-[14px] uppercase px-8 py-3 rounded-[8px] font-[800]">
                BUY NOW
              </a>
              <a href="https://docs.plutochain.io" target="_blank" className="border bg-[transparent] border-[#FF7900] md:w-auto w-full text-center text-[#fff] text-[14px] uppercase px-6 py-3 rounded-[8px] font-[800]">
                Read Docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
