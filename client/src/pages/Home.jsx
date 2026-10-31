import { Hero } from '../components/Hero.jsx';
import { Specials } from '../components/Specials.jsx';
import { Process } from '../components/Process.jsx';
import { Promo } from '../components/Promo.jsx';
import { Testimonials } from '../components/Testimonials.jsx';
import { About } from '../components/About.jsx';
import { Essentials } from '../components/Essentials.jsx';
import { Contact } from '../components/Contact.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export function Home() {
  usePageMeta(
    'VELARIS — Luxury Car Rental Miami',
    'A curated fleet of Mercedes-Benz, Porsche, Range Rover and Rolls-Royce vehicles with concierge delivery across Miami.',
  );

  return (
    <>
      <Hero />
      <Specials />
      <Process />
      <Promo />
      <Testimonials />
      <About />
      <Essentials />
      <Contact />
    </>
  );
}
