export default function PricingPage() {
  const coins = [
    "/icons/bitcoin-btc-logo.png",
    "/icons/ethereum.png",
    "/icons/USDT.png",
    "/icons/ripple.png",
    "/icons/Binance-Coin-BNB-icon.png",
  ];

  const plans = [
    {
      title: "Premier Master",
      deposit: "$500 – $50,000",
      profit: "0.83% Daily",
      apr: "25% – 30 Days APR",
      referral: null,
    },
    {
      title: "Premier Token Trust",
      deposit: "$50,000 – $150,000",
      profit: "1% Daily",
      apr: "30% – 30 Days APR",
      referral: "4%",
    },
    {
      title: "Premier Cera",
      deposit: "$150,000 – $300,000",
      profit: "1.2% Daily",
      apr: "36%+ – 30 Days APR",
      referral: "6%",
    },
    {
      title: "Premier Defi",
      deposit: "$300,000 – $500,000",
      profit: "1.5% Daily",
      apr: "45%+ APR",
      referral: "8%",
    },
    {
      title: "Premier Master Hall of Fame",
      deposit: "$500,000",
      profit: "2% Daily",
      apr: "720%+ – 360 Days APR",
      referral: "10%",
    },
    {
      title: "Premier NFP",
      deposit: "$100,000+",
      profit: "35% – 50% Single Day Trade",
      apr: "51% – 80% Twin Trade",
      extra: "Trade: Every Last Friday of the Month",
    },
    {
      title: "Business Cooperative",
      deposit: "$200,000",
      profit: "1.3% Daily",
      apr: "39%+ – 30 Days APR",
      benefits: [
        "0.3% Daily bonus to Private Account",
        "5% Bonus on Deposit above 50k+",
        "Partnership in Token Global",
      ],
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-[#FF7900] tracking-wide">
            Join the Financial System of the Future
          </h1>
          <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
            Choose from a range of premium investment plans designed for serious crypto investors.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="
                bg-[#141a24]/70 
                backdrop-blur-xl 
                border border-[#FF7900]/40 
                rounded-2xl 
                p-8 
                shadow-[0_0_20px_rgba(255,121,0,0.15)]
                transition-all 
                hover:shadow-[0_0_35px_rgba(255,121,0,0.35)]
                hover:border-[#FF7900]
                hover:-translate-y-1
              "
            >
              {/* Crypto Icons */}
              <div className="flex gap-3 mb-6 opacity-90">
                {coins.map((icon, idx) => (
                  <img
                    key={idx}
                    src={icon}
                    alt="coin"
                    className="w-8 h-8 object-contain"
                  />
                ))}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-4 tracking-wide">
                {plan.title}
              </h2>

              {/* Details */}
              <div className="space-y-2 text-sm opacity-90">
                <p><span className="font-semibold">Deposit Amount:</span> {plan.deposit}</p>
                <p><span className="font-semibold">Profit:</span> {plan.profit}</p>
                <p><span className="font-semibold">APR:</span> {plan.apr}</p>

                {plan.referral && (
                  <p><span className="font-semibold">Referral Bonus:</span> {plan.referral}</p>
                )}

                {plan.extra && (
                  <p className="font-semibold">{plan.extra}</p>
                )}

                {plan.benefits && (
                  <ul className="list-disc pl-5 space-y-1">
                    {plan.benefits.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Button */}
              <button
                className="
                  mt-6 
                  w-full 
                  bg-[#FF7900] 
                  text-black 
                  py-3 
                  rounded-lg 
                  font-bold 
                  uppercase 
                  tracking-wide
                  hover:bg-[#ff8f2a]
                  transition
                "
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
