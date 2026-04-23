import type { Metadata } from "next";
import LegalLayout from "@/components/privacy/LegalLayout";
import LegalSectionWithIcon from "@/components/privacy/LegalSectionWithIcon";
import LegalBulletList from "@/components/privacy/LegalBulletList";

export const metadata: Metadata = {
  title: "AML/KYC Policy | Polycogni Capital",
  description: "Anti-Money Laundering and Know Your Customer Policy for Polycogni Capital.",
};

export default function AMLKYCPage() {
  return (
    <LegalLayout
      title="AML / KYC Policy"
      subtitle="Anti-Money Laundering & Know Your Customer Policy · Polycogni Capital"
    >
      {/* Intro Banner */}
      <div className="bg-[#FF7900]/8 border border-[#FF7900]/20 rounded-2xl p-5 mb-8">
        <p className="text-sm text-white/70 leading-relaxed">
          Polycogni Capital operates in full compliance with international AML/KYC regulations.
          This policy outlines our commitment to maintaining a secure, transparent, and legally
          compliant platform for all users.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">

        <LegalSectionWithIcon
          number="01"
          title="Purpose"
          icon="🛡"
        >
          <p className="text-white/65 text-sm mb-3">
            Polycogni Capital is committed to preventing:
          </p>
          <LegalBulletList
            items={[
              "Money laundering",
              "Terrorist financing",
              "Fraud and financial crimes",
            ]}
          />
        </LegalSectionWithIcon>

        <LegalSectionWithIcon
          number="02"
          title="KYC Requirements"
          icon="🪪"
        >
          <p className="text-white/65 text-sm mb-3">Users may be required to provide:</p>
          <LegalBulletList items={["Valid government-issued ID"]} />
          <p className="text-white/40 text-sm italic mt-3">
            We reserve the right to request additional documents at our discretion.
          </p>
        </LegalSectionWithIcon>

        <LegalSectionWithIcon
          number="03"
          title="Identity Verification"
          icon="🔍"
        >
          <p className="text-white/65 text-sm mb-3">Verification may include:</p>
          <LegalBulletList items={["Automated checks", "Manual review"]} />
        </LegalSectionWithIcon>

        <LegalSectionWithIcon
          number="04"
          title="Monitoring Transactions"
          icon="📊"
        >
          <p className="text-white/65 text-sm mb-3">We actively monitor:</p>
          <LegalBulletList
            items={[
              "Unusual account activity",
              "Large or suspicious transactions",
              "Patterns inconsistent with user profile",
            ]}
          />
        </LegalSectionWithIcon>

        <LegalSectionWithIcon
          number="05"
          title="Suspicious Activity Reporting"
          icon="⚠️"
        >
          <p className="text-white/65 text-sm mb-3">We reserve the right to:</p>
          <LegalBulletList
            items={[
              "Freeze accounts pending investigation",
              "Report suspicious activity to relevant authorities",
              "Deny or delay transactions that appear suspicious",
            ]}
          />
        </LegalSectionWithIcon>

        <LegalSectionWithIcon
          number="06"
          title="Compliance"
          icon="✅"
        >
          <p className="text-white/65 text-sm mb-3">Users agree to:</p>
          <LegalBulletList
            items={[
              "Provide accurate and truthful information",
              "Cooperate fully with verification processes",
              "Not use the platform for illegal financial activities",
            ]}
          />
        </LegalSectionWithIcon>

      </div>
    </LegalLayout>
  );
}
