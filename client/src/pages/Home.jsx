import { ScrollDrivenHero } from '../components/ScrollDrivenHero.jsx';
import { Specials } from '../components/Specials.jsx';
import { Promo } from '../components/Promo.jsx';
import { About } from '../components/About.jsx';
import { Contact } from '../components/Contact.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export function Home() {
  usePageMeta(
    'VELARIS — Luxury Car Rental Miami',
    'A curated fleet of Mercedes-Benz, Porsche, Range Rover and Rolls-Royce vehicles with concierge delivery across Miami.',
  );

  return (
    <>
      <ScrollDrivenHero />
      <Specials />
      <Promo />
      <About />
      <Contact />
    </>
  );
}
