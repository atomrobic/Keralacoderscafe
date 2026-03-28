import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Mission from "./components/Mission";
import Contributors from "./components/Contributors";
import Projects from "./components/Projects";
import Guidelines from "./components/Guidelines";
import JoinCTA from "./components/JoinCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Marquee />
      <Mission />
      <Contributors />
      <Projects />
      <Guidelines />
      <JoinCTA />
      <Footer />
    </main>
  );
}
