import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ConceptSection } from "@/components/ConceptSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProofSection } from "@/components/ProofSection";
import { HowToStart } from "@/components/HowToStart";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <ConceptSection />
        <FeaturesSection />
        <ProofSection />
        <HowToStart />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
