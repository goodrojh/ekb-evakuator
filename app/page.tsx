"use client";
import { LeadProvider } from "@/components/LeadModal";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Situations from "@/components/Situations";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Fleet from "@/components/Fleet";
import Compare from "@/components/Compare";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Coverage from "@/components/Coverage";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <LeadProvider>
      <main className="min-h-screen">
        <Nav />
        <Hero />
        <Situations />
        <Pricing />
        <HowItWorks />
        <Fleet />
        <Compare />
        <Reviews />
        <FAQ />
        <Coverage />
        <Footer />
        <MobileBar />
      </main>
    </LeadProvider>
  );
}
