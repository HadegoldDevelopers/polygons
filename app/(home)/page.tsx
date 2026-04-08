import Hero from "@/components/home/Hero";
import FeaturedIn from "@/components/home/FeaturedIn";
import WhatIsPolycogni from "@/components/home/WhatIsPolycogni";
import PolycogniTestnet from "@/components/home/PolycogniTestnet";
import HowToBuy from "@/components/home/HowToBuy";
import UnleashBitcoin from "@/components/home/UnleashBitcoin";
import WhyPolycogni from "@/components/home/WhyPolycogni";
import Staking from "@/components/home/Staking";
import DevelopmentPhases from "@/components/home/DevelopmentPhases";
import Tokenomics from "@/components/home/Tokenomics";
import DeveloperSection from "@/components/home/DeveloperSection";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";



export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <FeaturedIn />
      <WhatIsPolycogni/>
      <PolycogniTestnet />
      <UnleashBitcoin />
      <WhyPolycogni />
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
