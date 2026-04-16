import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    q: "What is Polycogni Capital?",
    a: "The Future of Bitcoin Layer 2, Polycogni Capital is a state-of-the-art layer 2 solution that aims to address the scalability challenges faced by Bitcoin: By leveraging advanced scaling mechanisms such as state channels, sidechains, and blockchain rollups, Polycogni Capital enhances transaction speed and reduces fees, making Bitcoin and Ethereum more accessible and efficient for users worldwide",
},
{
  q: "Why Polycogni Capital?",
  a: `
    Polycogni Capital is positioned at the intersection of Bitcoin security and next generation blockchain innovation. By introducing smart contract capabilities and decentralized applications to the Bitcoin ecosystem, we aim to unlock new possibilities for developers, investors, and global users.<br><br>

    Our focus is on long‑term value creation through:<br>
    • Scalable and efficient blockchain infrastructure<br>
    • Strategic development and continuous innovation<br>
    • A growing ecosystem designed for real‑world adoption<br><br>

    As the digital asset space continues to evolve, Polycogni Capital seeks to be part of the transformation shaping the future of global finance.
  `,
},
  {
    q: "What is Layer 2?",
a: "Layer 2 is a solution built on top of the Bitcoin and Ethereum Network, offering faster and cheaper transactions, enabling double staking rewards for Polycogni Capital."
  },
  {
    q: "How Do I Buy Polycogni Capital Tokens?",
a: "Create an Account with us or Connect your wallet to our website. Load Wallet With Crypto: Use BTC, ETH, USDT, USDC, or your preferred cryptocurrency. Buy $PC, select your payment method, and opt to buy your token."
},
  {
    q: "When Can I Claim My Tokens?",
a: "After your first purchase of Polycogni Capital tokens, you will see your allocation on the Polycogni Capital Dashboard. The token will be sent to you on the blockchain."
},
  {
   q: "Can I also invest in the company without Purchasing Polycogni Capital?",
    a: "Yes, you can invest with us without purchasing Polycogni Capital."
 },
];

export default function FAQ() {
  return (
    <section className="lg:pt-10" id="faq">
      <div className="container">
        <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4 md:mb-10 text-center">
          faq
        </h2>

        <div className="flex items-center flex-wrap">
          {/* Questions — 7/12 */}
          <div className="w-full lg:w-7/12 p-4">
            <div className="flex flex-col">
              <div>
                <ul>
                  {faqs.map((faq, i) => (
                    <li key={i} className="border border-[#FF7900] rounded-lg mb-4 cursor-pointer">
                      <details name="faq" className="group p-5">
                        <summary className="text-[18px] text-[#fff] font-semibold list-none cursor-pointer">
                          <span className="text-white/60 mr-1">+</span> {faq.q}
                        </summary>
<p
  className="pt-4 text-white/70 text-[15px] leading-relaxed"
  dangerouslySetInnerHTML={{ __html: faq.a }}
/>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Astronaut image — 5/12 */}
          <div className="w-full lg:w-5/12 p-4">
            <Image src="/assets/faq.webp" width={80} height={80} className="w-full md:block hidden" alt="" loading="lazy" />
          </div>
        </div>

        {/* Astronaut — mobile */}
        <Image src="/assets/faq.webp" width={80} height={80} className="w-full md:hidden block my-4 mt-0 p-4 pt-0 pb-20" alt="" loading="lazy" />

        {/* CTA buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 pb-10 md:pb-0 md:py-20">
          <Link href="mailto:info@polycognicapital.com" className="bg-[#FF7900] hover:bg-opacity-90 text-[#000] text-center font-[800] py-4 px-6 rounded-lg text-[16px] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Contact Us
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent hover:bg-[#FF7900] hover:bg-opacity-10 text-white text-center font-[800] py-4 px-6 rounded-lg text-[16px] uppercase border-2 border-[#FF7900] transition-all duration-300 hover:scale-[1.02]"
          >
            Help Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
