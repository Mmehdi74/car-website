import Header from './components/Header';
import Hero from './components/Hero';
import MainShowcase from './components/MainShowcase';
import AboutSection from './components/AboutSection';
import FeaturedRides from './components/FeaturedRides';
import GuidesSection from './components/GuidesSection';
import Experience from './components/Experience';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { nav } from './data/content';

const sectionIds = nav.map((item) => item.id);

export default function App() {
  const active = useActiveSection(sectionIds);

  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-orange focus:px-4 focus:py-2 focus:font-tech focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-ink"
      >
        Skip to content
      </a>

      <Header active={active} />

      <main>
        <Hero />
        <MainShowcase />
        <AboutSection />
        <FeaturedRides />
        <GuidesSection />
        <Experience />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
