import LegalLayout from "@/components/privacy/LegalLayout";
import LegalSection from "@/components/privacy/LegalSection";
import LegalBulletList from "@/components/privacy/LegalBulletList";
import LegalSubSection from "@/components/privacy/LegalSubSection";

export const metadata = {
  title: "Privacy Policy | Polycogni Capital",
  description: "Privacy Policy for Polycogni Capital platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Polycogni Capital · Effective Date: March 19th"
    >
      <div className="space-y-8">

        <LegalSection number="01" title="Introduction">
          <p className="text-white/65 text-sm">
            Polycogni Capital (“we”, “our”, “us”) respects your privacy and is committed
            to protecting your personal data. This Privacy Policy explains how we collect,
            use, and safeguard your information when you use our platform.
          </p>
        </LegalSection>

        <LegalSection number="02" title="Information We Collect">
          <div className="space-y-4">
            <LegalSubSection
              title="a. Personal Information"
              items={[
                "Full name",
                "Email address",
                "Phone number",
                "Government-issued ID (for KYC)",
              ]}
            />

            <LegalSubSection
              title="b. Financial Information"
              items={["Wallet addresses", "Transaction history"]}
            />

            <LegalSubSection
              title="c. Technical Data"
              items={[
                "IP address",
                "Device type",
                "Browser type",
                "Cookies and usage data",
              ]}
            />
          </div>
        </LegalSection>

        <LegalSection number="03" title="How We Use Your Information">
          <LegalBulletList
            items={[
              "Provide and improve our services",
              "Verify your identity (KYC)",
              "Process transactions",
              "Prevent fraud and illegal activities",
              "Communicate with you",
              "Comply with legal obligations",
            ]}
          />
        </LegalSection>

        {/* Continue the rest of the sections the same way... */}

      </div>
    </LegalLayout>
  );
}
