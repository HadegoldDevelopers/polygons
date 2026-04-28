"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") }
  ];

  return (
    <section className="lg:pt-10" id="faq">
      <div className="container">
        <h2 className="font-[800] md:text-[56px] text-[32px] text-[#fff] uppercase md:leading-[75px] leading-[40px] mb-4 md:mb-10 text-center">
          {t("title")}
        </h2>

        <div className="flex items-center flex-wrap">
          {/* Questions — 7/12 */}
          <div className="w-full lg:w-7/12 p-4">
            <div className="flex flex-col">
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

          {/* Astronaut image — 5/12 */}
          <div className="w-full lg:w-5/12 p-4">
            <Image
              src="/assets/faq.png"
              width={80}
              height={80}
              className="w-full md:block hidden"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Astronaut — mobile */}
        <Image
          src="/assets/faq.png"
          width={80}
          height={80}
          className="w-full md:hidden block my-4 mt-0 p-4 pt-0 pb-20"
          alt=""
          loading="lazy"
        />

        {/* CTA buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 pb-10 md:pb-0 md:py-20">
          <Link
            href="mailto:info@polycognicapital.com"
            className="bg-[#FF7900] hover:bg-opacity-90 text-[#000] text-center font-[800] py-4 px-6 rounded-lg text-[16px] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("contact")}
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent hover:bg-[#FF7900] hover:bg-opacity-10 text-white text-center font-[800] py-4 px-6 rounded-lg text-[16px] uppercase border-2 border-[#FF7900] transition-all duration-300 hover:scale-[1.02]"
          >
            {t("helpDocs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
