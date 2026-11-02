import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AgeGate, readAgeConfirmation } from './components/AgeGate'
import { Collection } from './components/Collection'
import { Details } from './components/Details'
import { Discover } from './components/Discover'
import { FilmDialog } from './components/FilmDialog'
import { Hero } from './components/Hero'
import { Ingredients } from './components/Ingredients'
import { Intro } from './components/Intro'
import { Marquee } from './components/Marquee'
import { MenuOverlay } from './components/MenuOverlay'
import { Mouthfeels } from './components/Mouthfeels'
import { Newsletter } from './components/Newsletter'
import { Pairings } from './components/Pairings'
import { Process } from './components/Process'
import { ProductDialog } from './components/ProductDialog'
import { SearchOverlay } from './components/SearchOverlay'
import { Signoff } from './components/Signoff'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader, SiteRail } from './components/SiteHeader'
import { Story } from './components/Story'
import { products, type Product } from './content/site'
import { scrollToId, registerLenis } from './lib/scroll'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/sections.css'
import './styles/hero.css'

export default function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(() => readAgeConfirmation())
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [filmOpen, setFilmOpen] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const reduced = useReducedMotion()

  /* Inertial scrolling — the "kinetic slide" of the whole experience. */
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, wheelMultiplier: 0.92, smoothWheel: true })
    registerLenis(lenis as unknown as { scrollTo: (target: unknown, options?: Record<string, unknown>) => void })

    let frame = window.requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
      registerLenis(null)
    }
  }, [reduced])

  /* The age gate owns the page until it is answered. */
  useEffect(() => {
    document.body.classList.toggle('is-locked', !ageConfirmed)
    return () => document.body.classList.remove('is-locked')
  }, [ageConfirmed])

  const buy = () => {
    const favourite = products.find((item) => item.id === 'bottle-22') ?? products[0]
    setProduct(favourite)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="frame on-red">
        <div className="spread">
          <SiteRail onOpenMenu={() => setMenuOpen(true)} onOpenSearch={() => setSearchOpen(true)} />

          <div className="content">
            <SiteHeader
              onOpenMenu={() => setMenuOpen(true)}
              onOpenSearch={() => setSearchOpen(true)}
              onBuy={() => scrollToId('year-round')}
            />

            <main id="main">
              <Hero onBuy={buy} />
              <Marquee />
              <Mouthfeels onPlayFilm={() => setFilmOpen(true)} />
              <Collection onOpenProduct={setProduct} />
              <Pairings />
              <Story />
              <Process />
              <Ingredients />
              <Details />
              <Discover />
              <Newsletter />
              <Signoff />
            </main>

            <SiteFooter />
          </div>
        </div>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ProductDialog product={product} onClose={() => setProduct(null)} />
      <FilmDialog open={filmOpen} onClose={() => setFilmOpen(false)} />

      {!ageConfirmed && <AgeGate onAccept={() => setAgeConfirmed(true)} />}
      <Intro />
    </>
  )
}
