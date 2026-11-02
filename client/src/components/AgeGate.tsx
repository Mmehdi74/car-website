import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useDialogBehaviour } from '../lib/useDialogBehaviour'

const STORAGE_KEY = 'lagunitas.age-verified'
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

export function readAgeConfirmation() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const stamp = Number(raw)
    if (!Number.isFinite(stamp)) return false
    if (Date.now() - stamp > THIRTY_DAYS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function storeAgeConfirmation() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    /* storage unavailable — the gate simply asks again next visit */
  }
}

export function clearAgeConfirmation() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* no-op */
  }
}

export function AgeGate({ onAccept }: { onAccept: () => void }) {
  const [declined, setDeclined] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useDialogBehaviour(true, null, panelRef)

  return (
    <div className="gate on-red">
      <motion.div
        ref={panelRef}
        className="gate__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        aria-describedby="gate-body"
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className="gate__logo" src="/img/logo.svg" alt="Lagunitas Brewing Co." />
        {!declined ? (
          <>
            <p className="eyebrow" style={{ color: 'var(--red)' }}>
              Age verification
            </p>
            <h1 className="gate__title" id="gate-title">
              Are you of legal drinking age?
            </h1>
            <p className="gate__body" id="gate-body">
              This site is about beer, so we have to ask. You must be of legal drinking age in your
              country of residence to come in. We will remember your answer for thirty days.
            </p>
            <div className="gate__actions">
              <button
                type="button"
                className="btn btn--red"
                data-autofocus
                onClick={() => {
                  storeAgeConfirmation()
                  onAccept()
                }}
              >
                Yes, come in
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setDeclined(true)}>
                No, not yet
              </button>
            </div>
            <p className="gate__fine">
              Lagunitas Brewing Company believes in responsible drinking. Never drink and drive.
              Alcohol is not for minors, and it is not for everyone.
            </p>
          </>
        ) : (
          <div className="gate__declined">
            <h1 className="gate__title" id="gate-title">
              Come back soon
            </h1>
            <p className="gate__body">
              Thanks for being honest. There is no beer here for you yet — but there is a whole
              internet of other things to look at, and we will keep the taproom lights on for when
              you are older.
            </p>
            <button type="button" className="btn btn--ghost" onClick={() => setDeclined(false)}>
              I made a mistake
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
