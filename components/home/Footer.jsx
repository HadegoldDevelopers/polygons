import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="md:pt-20">
      <div className="container">
        <div className="flex flex-wrap">

          {/* Brand col */}
          <div className="w-full lg:w-4/12 p-4">
            <div className="flex flex-col gap-6">
              <div className="md:pb-6">
                <Logo size="md" />
              </div>
              <p className="text-[18px] leading-5.5">Powering Next Gen Crypto</p>
              <p className="text-[14px] leading-4.5">© Polycogni Capital Copyright 2025</p>
              <p className="text-[14px] leading-4.5">All Rights Reserved</p>
            </div>
          </div>

          {/* Join Us col */}
          <div className="w-6/12 lg:w-3/12 p-4">
            <h6 className="text-[14px] text-[#FF7900] mb-4 uppercase">JOIN US</h6>
            <ul>
              {[
                { href: "#",                          icon: "/icons/s1.svg",                     label: "twitter"  },
                { href: "#",              icon: "/icons/tg.svg",                      label: "Telegram" },
                { href: "#",    icon: "/icons/s3.svg",                     label: "Github"   },
                { href: "#",                      icon: "/icons/discord.svg",                 label: "Discord"  },
                { href: "mailto:info@polycognicapital.com",                          icon: "/icons/s4.svg",                     label: "Contact"  },
              ].map((item) => (
                <li key={item.label} className="mb-3">
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <Image src={item.icon} height={24} width={24} alt="" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation col */}
          <div className="w-6/12 lg:w-4/12 p-4">
            <h6 className="text-[14px] text-[#FF7900] mb-4 uppercase">Documentation</h6>
            <ul>
              {[
                { href: "/whitepaper/Polycogni_Capital_Whitepaper.pdf",                icon: "/icons/d1.svg", label: "Whitepaper"            },
                { href: "#",                        icon: "/icons/d2.svg", label: "Security and Audits"   },
                { href: "/aml-kyc", icon: "/icons/d3.svg", label: "Terms and conditions" },
                { href: "/privacy",       icon: "/icons/d4.svg", label: "privacy policy"       },
              ].map((item) => (
                <li key={item.label} className="mb-3">
                  <a
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <Image src={item.icon} height={24} width={24} alt="" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Legal disclaimer — exact text from source */}
        <p className="text-[14px] leading-4.5 p-4 text-white/40">
          Disclaimer: By accessing this website, using our services, or purchasing Polycogni Capital tokens, you acknowledge that you have read, understood, and agreed to be bound by our{" "}
          <Link href="/aml-kyc" target="_blank" className="underline"> Terms of Service </Link>
          {" "}and{" "}
          <Link href="/privacy" target="_blank" className="underline">Privacy Policy.</Link>
          {" "}You further confirm that you fully understand the risks associated with cryptocurrencies, including but not limited to price volatility, regulatory uncertainty, and potential loss of funds. Participation in the Polycogni Capital ecosystem is entirely at your own discretion and risk.
          <br /><br />
          Polycogni Capital is a blockchain based project designed to enhance the capabilities of the Bitcoin network by enabling smart contracts and decentralized applications. While we are committed to building a robust and innovative platform, cryptocurrency markets are inherently unpredictable, and no guarantees can be made regarding future performance, price appreciation, or liquidity.
          <br /><br />
          By proceeding with a purchase, you represent and warrant that: {" "}
           <ol>
            <li>•	You are not a citizen or resident of any jurisdiction where participation in token sales or cryptocurrency investments is restricted or prohibited.</li>
            <li>•	You are legally permitted to engage in such transactions under the laws applicable to you.</li>
           </ol>
          {" "}If you do not agree with these terms, please do not use our services or purchase our tokens.
        </p>
      </div>
    </footer>
  );
}
