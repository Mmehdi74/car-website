import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Specials from './components/Specials';
import PromoBanner from './components/PromoBanner';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VehicleModal from './components/VehicleModal';
import LegalModal from './components/LegalModal';

export default function App() {
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [legal, setLegal] = useState(null);

  // Honour deep links like /#fleet when the page is opened from elsewhere.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <>
      <a href="#fleet" className="skip-link">
        Skip to fleet
      </a>
      <Header />
      <main>
        <Hero />
        <Specials onOpenVehicle={setActiveVehicle} />
        <PromoBanner />
        <About />
        <Contact />
      </main>
      <Footer onOpenLegal={setLegal} />

      {activeVehicle && (
        <VehicleModal vehicle={activeVehicle} onClose={() => setActiveVehicle(null)} />
      )}
      {legal && <LegalModal kind={legal} onClose={() => setLegal(null)} />}
    </>
  );
}
