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
                { href: "#", icon: "/icons/d3.svg", label: "Terms and conditions" },
                { href: "#",       icon: "/icons/d4.svg", label: "privacy policy"       },
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
          Disclaimer: By visiting this website, using our services, or buying Polycogni Capital, you agree to our{" "}
          <Link href="/" target="_blank" className="underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/" target="_blank" className="underline">Privacy Policy.</Link>
          {" "}You also warrant that you have read and fully understood the{" "}
          <Link href="/" target="_blank" className="underline">Disclaimer</Link>
          {" "}about the risks of purchasing cryptocurrencies like Polycogni Capital. By completing a purchase, you also declare that you are not a citizen or resident of any banned country, or any other country where the purchase of Polycogni Capital may be prohibited by law. A complete list of banned countries is available{" "}
          <Link href="/" target="_blank" className="underline">here.</Link>
          {" "}Our list of blocked countries and terms of service may be subject to updates, so please check the latest version.
          <br /><br />
          Polycogni Capital is not an investment; it is created as an experimental new cryptocurrency. Polycogni Capital tokens are not currently resellable. They are only usable as an ecosystem asset. There is no guarantee they will ever be resellable or tradable on any market. We do not guarantee or represent that Polycogni Capital holds any intrinsic value, that it will increase in price after the presale, or that it will have any value after the presale. We make no representations or warranties regarding Polycogni Capital and are not liable for any losses or errors that may occur during its use. All users should exercise caution and buy Polycogni Capital entirely at their own risk.
          <br /><br />
          By using the Polycogni Capital platform and product, you accept it as is, acknowledging that we may not update, enhance, or maintain it regularly. The services and interface may be unavailable or discontinued at any time.
        </p>
      </div>
    </footer>
  );
}
