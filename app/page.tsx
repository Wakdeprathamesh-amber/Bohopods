import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyBoho } from "@/components/sections/WhyBoho";
import { Process } from "@/components/sections/Process";
import { Pods } from "@/components/sections/Pods";
import { Addons } from "@/components/sections/Addons";
import { Comparison } from "@/components/sections/Comparison";
import { Advantage } from "@/components/sections/Advantage";
import { ImageBreak } from "@/components/sections/ImageBreak";
import { Ownership } from "@/components/sections/Ownership";
import { Experiences } from "@/components/sections/Experiences";
import { Locations } from "@/components/sections/Locations";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrochureTeaser } from "@/components/sections/BrochureTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { SeoContent } from "@/components/sections/SeoContent";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Advantage />
        <WhyBoho />
        <Process />
        <Pods />
        <Addons />
        <Comparison />
        <ImageBreak />
        <TrustBar />
        <Ownership />
        <Experiences />
        <Locations />
        <Gallery />
        <Testimonials />
        <BrochureTeaser />
        <Faq />
        <SeoContent />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
