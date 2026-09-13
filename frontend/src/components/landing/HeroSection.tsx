import SphereHero from "./HeroComponent";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <div id="root-wrapper" className="app-root relative">
      <Navbar />
      <SphereHero />
    </div>
  );
}