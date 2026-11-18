import { useEffect, useId, useRef, useState, type RefObject } from 'react'

type Props = {
  onDismiss: () => void
  returnFocusRef?: RefObject<HTMLElement | null>
}

export function WelcomeOverlay({ onDismiss, returnFocusRef }: Props) {
  const [fading, setFading] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const headingId = useId()

  useEffect(() => {
    if (!fading) return
    const id = window.setTimeout(() => onDismiss(), 300)
    return () => window.clearTimeout(id)
  }, [fading, onDismiss])

  useEffect(() => {
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setFading(true)
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const returnNode = returnFocusRef?.current ?? null
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      returnNode?.focus()
    }
  }, [returnFocusRef])

  return (
    <div
      className={`welcome-overlay ${fading ? 'welcome-overlay--fading' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div className="welcome-backdrop" />
      <div className="welcome-card" ref={dialogRef}>
        <div className="welcome-titlebar" aria-hidden="true">
          <span className="win-dot win-dot--red" />
          <span className="win-dot win-dot--amber" />
          <span className="win-dot win-dot--green" />
        </div>
        <div className="welcome-content">
          <h2 className="welcome-heading" id={headingId}>
            Terminal view
          </h2>
          <p className="welcome-sub">
            Left panel browses experience and projects; top-right is the bio; bottom panels cover
            skills and contact. Switch back to Overview anytime from the top tabs.
          </p>
        </div>
        <button
          type="button"
          className="welcome-button"
          ref={closeBtnRef}
          onClick={() => setFading(true)}
        >
          [ got it → ]
        </button>
      </div>
    </div>
  )
}
