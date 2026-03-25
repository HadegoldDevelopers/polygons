import Hero from "@/components/Hero";
import FeaturedIn from "@/components/FeaturedIn";
import WhatIsPolycogni from "@/components/WhatIsPolycogni";
import PolycogniTestnet from "@/components/PolycogniTestnet";
import HowToBuy from "@/components/HowToBuy";
import UnleashBitcoin from "@/components/UnleashBitcoin";
import WhyPlutoChain from "@/components/WhyPlutoChain";
import Staking from "@/components/Staking";
import DevelopmentPhases from "@/components/DevelopmentPhases";
import Tokenomics from "@/components/Tokenomics";
import DeveloperSection from "@/components/DeveloperSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";




export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <FeaturedIn />
      <WhatIsPolycogni/>
      <PolycogniTestnet />
      <UnleashBitcoin />
      <WhyPlutoChain />
      <Staking />
      <DevelopmentPhases />
      <Tokenomics />
      <HowToBuy />
      <DeveloperSection />
      <FAQ/>
      <Footer />
    </main>
  );
}
