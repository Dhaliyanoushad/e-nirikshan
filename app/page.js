import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Problem from "./components/Problem";
import Capabilities from "./components/Capabilities";
import Updates from "./components/Updates";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />

      <Stats />

      <About />

      <Problem />

      <Capabilities />

      <Updates />

      <Footer />
    </main>
  );
}
