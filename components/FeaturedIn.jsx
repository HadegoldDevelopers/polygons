export default function FeaturedIn() {
  const logos = [
    { src: "/partners/analytics_insight_logo_hd.webp", w: 228, alt: "Analytics Insight" },
    { src: "/partners/the_crypto_times_logo_hd.webp",  w: 210, alt: "The Crypto Times" },
    { src: "/partners/crypto_news_flash_logo_hd.webp", w: 134, alt: "Crypto News Flash" },
    { src: "/partners/coinspeaker_logo_hd.webp",       w: 174, alt: "Coinspeaker" },
    { src: "/partners/coin_gape_logo_hd.webp",         w: 174, alt: "Coin Gape" },
    // duplicate for seamless loop
    { src: "/partners/analytics_insight_logo_hd.webp", w: 228, alt: "Analytics Insight" },
    { src: "/partners/the_crypto_times_logo_hd.webp",  w: 210, alt: "The Crypto Times" },
    { src: "/partners/crypto_news_flash_logo_hd.webp", w: 134, alt: "Crypto News Flash" },
    { src: "/partners/coinspeaker_logo_hd.webp",       w: 174, alt: "Coinspeaker" },
    { src: "/partners/coin_gape_logo_hd.webp",         w: 174, alt: "Coin Gape" },
  ];

  return (
    <section>
      <div className="container">
        <div className="text-center md:mt-10 mb-0 pb-5">
          <h2 className="font-[800] text-[20px] text-[#fff] uppercase">Featured in</h2>
        </div>
      </div>

      {/* Marquee with source-exact mask */}
      <div
        className="overflow-hidden will-change-transform"
        style={{
          WebkitMaskImage: "-webkit-linear-gradient(left, transparent 0%, black 5%, black 95%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center marquee-track"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {logos.map((logo, i) => (
            <img
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
