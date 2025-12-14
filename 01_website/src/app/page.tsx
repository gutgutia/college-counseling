import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { ProblemStats } from "@/components/sections/ProblemStats";
import { Audience } from "@/components/sections/Audience";
import { Timeline } from "@/components/sections/Timeline";
import { Comparison } from "@/components/sections/Comparison";
import { Trust } from "@/components/sections/Trust";
import { WhatIncluded } from "@/components/sections/WhatIncluded";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { ForParents } from "@/components/sections/ForParents";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemStats />
        <HowItWorks />
        <Features />
        <Audience />
        <ForParents />
        <Timeline />
        <Comparison />
        <Pricing />
        <WhatIncluded />
        <Trust />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
