"use client";

export default function WhyPlutoChain() {
  const features = [
    { img: "/assets/wh1.png", title: "Scalability",            desc: "Helping to scale the Bitcoin blockchain with layer 2 technology and smart contracts" },
    { img: "/assets/wh2.png", title: "Low Transaction Cost",   desc: "Reducing transaction costs to a fraction of what Bitcoin typically incurs" },
    { img: "/assets/wh3.png", title: "EVM Compatibility",      desc: "Bringing EVM compatibility to the most secure blockchain, allowing builders to port their applications to Bitcoin" },
    { img: "/assets/wh4.png", title: "Trillion-Dollar Economy",desc: "Bringing smart contracts to the trillion-dollar Bitcoin economy" },
  ];

  return (
    <section className="pt-10" id="features">
      <div className="container">
        <h2 className="font-[800] md:text-[62px] text-[40px] text-[#FFFFFF] uppercase md:leading-[75px] leading-[40px] mb-4 text-center">
          Why PlutoChain?
        </h2>

        <div className="flex pb-4 flex-wrap pt-5">
          {features.map((f, i) => (
            <div key={i} className="w-1/2 lg:w-3/12 p-4 md:px-6 px-4 text-center">
              <img alt={`wh${i+1}`} width={80} height={80} className="w-[80px] h-[80px] mb-4 mx-auto" src={f.img} />
              <h4 className="font-[800] text-[20px] leading-[24px] mb-3 text-[#FF7900]">{f.title}</h4>
              <p className="font-[500] text-[14px] leading-[18px] text-[#fff]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:justify-center gap-4 pb-10 pt-6 px-4 md:px-0">
          <a href="#presale" className="bg-[#FF7900] hover:bg-opacity-90 text-[#000000] hover:text-[#000000] text-[14px] font-[800] uppercase px-16 py-3.5 rounded-[8px] text-center">
            BUY NOW
          </a>
          <a href="https://plutochain.io/whitepaper.pdf" target="_blank" className="border border-[#FF7900] text-[#FFF] md:text-[#FF7900] hover:text-[#FFFFFF] text-[14px] font-[800] uppercase px-7 py-3.5 rounded-[8px] text-center">
            READ WHITEPAPER
          </a>
        </div>
      </div>
    </section>
  );
}
