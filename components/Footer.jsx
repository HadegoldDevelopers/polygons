export default function Footer() {
  return (
    <footer className="md:pt-20">
      <div className="container">
        <div className="flex flex-wrap">

          {/* Brand col */}
          <div className="w-full lg:w-4/12 p-4">
            <div className="flex flex-col gap-6">
              <div className="md:pb-6">
                <img src="/plutochain-logo.svg" alt="PlutoChain" />
              </div>
              <p className="text-[18px] leading-[22px]">Powering Next Gen Crypto</p>
              <p className="text-[14px] leading-[18px]">© PlutoChain Copyright 2025</p>
              <p className="text-[14px] leading-[18px]">All Rights Reserved</p>
            </div>
          </div>

          {/* Join Us col */}
          <div className="w-6/12 lg:w-3/12 p-4">
            <h6 className="text-[14px] text-[#FF7900] mb-4 uppercase">JOIN US</h6>
            <ul>
              {[
                { href: "https://x.com/plutochain/",                          icon: "/assets/s1.svg",                     label: "twitter"  },
                { href: "https://t.me/PlutoChainAnnouncements/",              icon: "/icons/tg.svg",                      label: "Telegram" },
                { href: "https://github.com/pluto-chain/plutochain-erc20",    icon: "/assets/s3.svg",                     label: "Github"   },
                { href: "https://discord.gg/PlutoChain",                      icon: "/icons/discord.svg",                 label: "Discord"  },
                { href: "mailto:info@plutochain.io",                          icon: "/assets/s4.svg",                     label: "Contact"  },
              ].map((item) => (
                <li key={item.label} className="mb-3">
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <img src={item.icon} height={24} width={24} alt="" />
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
                { href: "https://plutochain.io/whitepaper.pdf",                icon: "/assets/d1.svg", label: "Whitepaper"            },
                { href: "https://github.com/Quillhash",                        icon: "/assets/d2.svg", label: "Security and Audits"   },
                { href: "https://docs.plutochain.io/resources/terms-and-conditions.html", icon: "/assets/d3.svg", label: "Terms and conditions" },
                { href: "https://docs.plutochain.io/resources/privacy-policy.html",       icon: "/assets/d4.svg", label: "privacy policy"       },
                { href: "/balance",                                             icon: "/assets/d5.svg", label: "Token balance checker" },
                { href: "/academy",                                             icon: "/plutochain-logo-small-white.png", label: "PlutoChain Academy"  },
                { href: "/education",                                           icon: "/plutochain-logo-small-white.png", label: "PlutoChain Education" },
              ].map((item) => (
                <li key={item.label} className="mb-3">
                  <a
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <img src={item.icon} height={24} width={24} alt="" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer — exact text from source */}
        <p className="text-[14px] leading-[18px] p-4 text-white/40">
          Disclaimer: By visiting this website, using our services, or buying PlutoChain, you agree to our{" "}
          <a href="https://docs.plutochain.io/resources/terms-and-conditions.html" target="_blank" className="underline">Terms of Service</a>
          {" "}and{" "}
          <a href="https://docs.plutochain.io/resources/privacy-policy.html" target="_blank" className="underline">Privacy Policy.</a>
          {" "}You also warrant that you have read and fully understood the{" "}
          <a href="https://docs.plutochain.io/resources/disclaimer.html" target="_blank" className="underline">Disclaimer</a>
          {" "}about the risks of purchasing cryptocurrencies like PlutoChain. By completing a purchase, you also declare that you are not a citizen or resident of any banned country, or any other country where the purchase of PlutoChain may be prohibited by law. A complete list of banned countries is available{" "}
          <a href="https://docs.plutochain.io/resources/restrictions.html" target="_blank" className="underline">here.</a>
          {" "}Our list of blocked countries and terms of service may be subject to updates, so please check the latest version.
          <br /><br />
          PlutoChain is not an investment; it is created as an experimental new cryptocurrency. Plutochain tokens are not currently resellable. They are only usable as an ecosystem asset. There is no guarantee they will ever be resellable or tradable on any market. We do not guarantee or represent that PlutoChain holds any intrinsic value, that it will increase in price after the presale, or that it will have any value after the presale. We make no representations or warranties regarding PlutoChain and are not liable for any losses or errors that may occur during its use. All users should exercise caution and buy PlutoChain entirely at their own risk.
          <br /><br />
          By using the PlutoChain platform and product, you accept it "as is", acknowledging that we may not update, enhance, or maintain it regularly. The services and interface may be unavailable or discontinued at any time.
        </p>
      </div>
    </footer>
  );
}
