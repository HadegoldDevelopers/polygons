"use client";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const l = useTranslations("legal");

  const joinUsLinks = [
    { href: "#",                               icon: "/icons/s1.svg",      key: "twitter"  },
    { href: "#",                               icon: "/icons/tg.svg",      key: "telegram" },
    { href: "#",                               icon: "/icons/s3.svg",      key: "github"   },
    { href: "#",                               icon: "/icons/discord.svg", key: "discord"  },
    { href: "mailto:info@polycognicapital.com", icon: "/icons/s4.svg",     key: "contact"  },
  ];

  const docLinks = [
    { href: "/whitepaper/Polycogni_Capital_Whitepaper.pdf", icon: "/icons/d1.svg", key: "whitepaper"  },
    { href: "#",                                             icon: "/icons/d2.svg", key: "security"    },
    { href: "/aml-kyc",                                      icon: "/icons/d3.svg", key: "terms"       },
    { href: "/privacy",                                      icon: "/icons/d4.svg", key: "privacy"     },
  ];

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
              <p className="text-[18px] leading-5.5">{t("powering")}</p>
              <p className="text-[14px] leading-4.5">{t("copyright")}</p>
              <p className="text-[14px] leading-4.5">{t("rights")}</p>
            </div>
          </div>

          {/* Join Us col */}
          <div className="w-6/12 lg:w-3/12 p-4">
            <h6 className="text-[14px] text-[#FF7900] mb-4 uppercase">{t("joinUs")}</h6>
            <ul>
              {joinUsLinks.map((item) => (
                <li key={item.key} className="mb-3">
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <Image src={item.icon} height={24} width={24} alt="" />
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation col */}
          <div className="w-6/12 lg:w-4/12 p-4">
            <h6 className="text-[14px] text-[#FF7900] mb-4 uppercase">{t("documentation")}</h6>
            <ul>
              {docLinks.map((item) => (
                <li key={item.key} className="mb-3">
                  <a
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center hover:text-[#FF7900] gap-3 uppercase text-[14px]"
                  >
                    <Image src={item.icon} height={24} width={24} alt="" />
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="text-[14px] leading-4.5 p-4 text-white/40">
  {l("disclaimer")}{" "}
  <Link href="/aml-kyc" target="_blank" className="underline">
    {t("terms")}
  </Link>
  {" "}{l("and")}{" "}
  <Link href="/privacy" target="_blank" className="underline">
    {t("privacy")}
  </Link>
  {" "}{l("risks")}
  <br /><br />
  {l("about")}
  <br /><br />
  {l("byProceeding")}
</p>

<ol className="text-[14px] leading-4.5 p-4 text-white/40 list-disc ml-6">
  <li>{l("jurisdiction")}</li>
  <li>{l("legally")}</li>
</ol>

<p className="text-[14px] leading-4.5 p-4 text-white/40">
  {l("noAgree")}
</p>

      </div>
    </footer>
  );
}