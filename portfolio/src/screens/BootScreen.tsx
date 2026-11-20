import { useEffect, useRef, useState } from 'react'

type Props = {
  onComplete: () => void
}

const LINES = [
  'Started user session for shishir',
  'Loading Hyprland compositor...',
  'Applying dotfiles from ~/.config/hypr/',
  'Mounting wallpaper: arctic_dark.jpg',
  'Initialising btop, ranger, nvim...',
  'Spawning waybar...',
  'Portfolio ready. Launching desktop...',
]

const LINE_MS = 150

export function BootScreen({ onComplete }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let cancelled = false
    let index = 0
    let timeoutId = 0

    const step = () => {
      if (cancelled) return
      index += 1
      setVisibleCount(index)
      if (index === LINES.length) {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) onCompleteRef.current()
        }, 400)
      } else {
        timeoutId = window.setTimeout(step, LINE_MS)
      }
    }

    timeoutId = window.setTimeout(step, LINE_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="boot-root">
      <p className="boot-header">
        // Loading Shishir&apos;s portfolio desktop — this will only take a moment
      </p>

      <div className="boot-lines">
        {LINES.map((line, i) => (
          <div
            key={line}
            className={`boot-line ${i < visibleCount ? 'boot-line--visible' : ''}`}
          >
            <span className="boot-ok">[ OK ]</span>{' '}
            <span className="boot-text">{line}</span>
            {i === LINES.length - 1 && i < visibleCount ? (
              <span className="boot-cursor" aria-hidden="true">
                █
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <p className="boot-skip-hint">Press any key or tap to skip</p>
    </div>
  )
}
