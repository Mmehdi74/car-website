import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { hero } from '../content/site'
import { scrollToId } from '../lib/scroll'
import { SpecLedger } from './SpecLedger'
import { IconArrowDown } from './ui/Icons'

const formats = ['Year round', '12 oz can', '19.2 oz can', '12 oz bottle', '22 oz bottle', 'Draught']

export function Hero({ onBuy }: { onBuy: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const wordsY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.07])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 110,
    damping: 18,
  })
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 110,
    damping: 18,
  })

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      className="hero"
      id="release"
      aria-labelledby="hero-title"
      ref={sectionRef}
      onPointerMove={
        reduced
          ? undefined
          : (event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
              pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
            }
      }
      onPointerLeave={
        reduced
          ? undefined
          : () => {
              pointerX.set(0)
              pointerY.set(0)
            }
      }
    >
      <motion.div
        className="hero__type"
        aria-hidden="true"
        style={reduced ? undefined : { y: wordsY, opacity: fade }}
      >
        {hero.words.map((word, index) => (
          <span className="hero__clip" key={word}>
            <motion.span
              className={`hero__word hero__word--${index === 0 ? 'a' : 'b'} display grudge`}
              initial={reduced ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.25, delay: 0.1 + index * 0.1, ease }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>

      <div className="hero__stage">
        <motion.div
          className="hero__col hero__col--left"
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          <span className="hero__script script">{hero.script}</span>
          <h1 className="hero__title" id="hero-title">
            {hero.title}
          </h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <button type="button" className="btn" onClick={onBuy}>
              {hero.cta}
            </button>
            <span className="hero__kicker">{hero.kicker}</span>
          </div>
        </motion.div>

        <motion.div
          className="hero__bottle-wrap"
          style={reduced ? undefined : { y: bottleY, scale: bottleScale }}
        >
          <span className="hero__contact" aria-hidden="true" />
          <motion.div
            className="hero__bottle-tilt"
            style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
          >
            <motion.img
              className="hero__bottle"
              src={hero.bottle}
              alt={hero.bottleAlt}
              width={675}
              height={1024}
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 40, rotate: -7 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: -3.2 }}
              transition={{ duration: 1.2, delay: 0.25, ease }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__col hero__col--right"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
        >
          <SpecLedger startDelay={0.7} />
        </motion.div>
      </div>

      <div className="hero__foot">
        <ul className="hero__avail">
          {formats.map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
        <button type="button" className="hero__scroll" onClick={() => scrollToId('mouthfeels')}>
          Next: mouthfeels
          <IconArrowDown />
        </button>
      </div>
    </section>
  )
}
