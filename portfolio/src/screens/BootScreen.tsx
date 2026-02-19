import { useEffect, useState } from 'react'

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

export function BootScreen({ onComplete }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let index = 0
    const step = () => {
      index += 1
      setVisibleCount(index)
      if (index === LINES.length) {
        window.setTimeout(() => onComplete(), 600)
      } else {
        window.setTimeout(step, 380)
      }
    }

    const id = window.setTimeout(step, 380)
    return () => window.clearTimeout(id)
  }, [onComplete])

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
    </div>
  )
}

