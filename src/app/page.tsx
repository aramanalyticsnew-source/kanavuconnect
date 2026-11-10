import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { AboutIntro } from "@/components/home/AboutIntro";
import { WhoShouldAttend } from "@/components/home/WhoShouldAttend";
import { EventTimeline } from "@/components/home/EventTimeline";
import { RegionalHubs } from "@/components/home/RegionalHubs";
import { Networking } from "@/components/home/Networking";
import { SponsorshipShowcase } from "@/components/home/SponsorshipShowcase";
import { GreenInitiative } from "@/components/home/GreenInitiative";
import { RegistrationCTA } from "@/components/home/RegistrationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <AboutIntro />
      <WhoShouldAttend />
      <EventTimeline />
      <RegionalHubs />
      <Networking />
      <SponsorshipShowcase />
      <GreenInitiative />
      <RegistrationCTA />
    </>
  );
}
