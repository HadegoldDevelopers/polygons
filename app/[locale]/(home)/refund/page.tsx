import type { Metadata } from "next";
import LegalLayout from "@/components/privacy/LegalLayout";
import LegalSectionVariant from "@/components/privacy/LegalSectionVariant";
import LegalBulletList from "@/components/privacy/LegalBulletList";

export const metadata: Metadata = {
  title: "Refund Policy | Polycogni Capital",
  description: "Refund Policy for Polycogni Capital platform.",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      subtitle="Polycogni Capital · Please read carefully before transacting"
    >
      {/* Warning Banner */}
      <div className="bg-[#ff4d6a]/8 border border-[#ff4d6a]/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-white">Important:</strong> Due to the irreversible nature of blockchain
          technology, all transactions are final. Please verify all details carefully before confirming
          any transaction on our platform.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">

        <LegalSectionVariant number="01" title="General Policy" variant="neutral">
          <p className="text-white/65 text-sm font-semibold">
            All transactions on Polycogni Capital are final and non-refundable.
          </p>

          <p className="text-white/65 text-sm mt-3">This includes:</p>

          <LegalBulletList
            items={[
              "Token purchases",
              "Deposits",
              "Staking allocations",
            ]}
          />
        </LegalSectionVariant>

        <LegalSectionVariant number="02" title="No Reversal of Blockchain Transactions" variant="warning">
          <p className="text-white/65 text-sm mb-3">
            Due to the irreversible nature of blockchain technology:
          </p>

          <LegalBulletList
            items={[
              "Transactions are irreversible once broadcast to the network",
              "Once completed, they cannot be canceled or recalled",
              "We have no technical ability to reverse confirmed transactions",
            ]}
          />
        </LegalSectionVariant>

        <LegalSectionVariant number="03" title="Exceptions" variant="success">
          <p className="text-white/65 text-sm mb-3">Refunds may only be considered if:</p>

          <LegalBulletList
            items={[
              "Required by applicable law",
              "A technical error is proven and verified by our team",
            ]}
          />

          <p className="text-white/40 text-xs italic mt-2">
            All exception claims are subject to internal investigation and sole discretion of Polycogni Capital.
          </p>
        </LegalSectionVariant>

        <LegalSectionVariant number="04" title="User Responsibility" variant="neutral">
          <p className="text-white/65 text-sm mb-3">Users are solely responsible for:</p>

          <LegalBulletList
            items={[
              "Entering correct wallet addresses",
              "Confirming all transaction details before submission",
              "Understanding the irreversible nature of blockchain transactions",
            ]}
          />

          <p className="text-white/65 text-sm font-semibold mt-2">
            We are not liable for losses resulting from user errors.
          </p>
        </LegalSectionVariant>

        <LegalSectionVariant number="05" title="Chargebacks" variant="danger">
          <div className="space-y-4">

            <div>
              <p className="text-white/65 text-sm mb-2">Any attempt to:</p>
              <LegalBulletList
                items={[
                  "Reverse payments fraudulently",
                  "Initiate unauthorized chargebacks",
                ]}
              />
            </div>

            <div>
              <p className="text-white/65 text-sm mb-2">May result in:</p>
              <ul className="space-y-1.5">
                {["Immediate account suspension", "Legal action"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[#ff4d6a] text-sm font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d6a] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </LegalSectionVariant>

      </div>

      {/* Contact Box */}
      <div className="mt-10 bg-[#111118] border border-white/6 rounded-2xl p-6">
        <p className="text-sm font-bold mb-2">Questions about this policy?</p>
        <p className="text-sm text-white/50">
          Contact us at{" "}
          <a href="mailto:support@polycognicapital.com" className="text-[#FF7900] hover:underline">
            support@polycognicapital.com
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
