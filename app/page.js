import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Snapshot from "./components/Snapshot";
import MapPreview from "./components/MapPreview";
import HowItWorks from "./components/HowItWorks";
import RecentProjects from "./components/RecentProjects";
import TransparencyIndex from "./components/TransparencyIndex";

export default function Home() {
  return (
    <main className="bg-[#E8E2DB]">
      <Hero />
      <Stats />
      <Snapshot />
      <MapPreview />
      <HowItWorks />
      <RecentProjects />
      <TransparencyIndex />
    </main>
  );
}
