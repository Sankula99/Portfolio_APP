import { useEffect, useState } from 'react'

type Props = {
  onDismiss: () => void
}

export function WelcomeOverlay({ onDismiss }: Props) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!fading) return
    const id = window.setTimeout(() => onDismiss(), 300)
    return () => window.clearTimeout(id)
  }, [fading, onDismiss])

  return (
    <div className={`welcome-overlay ${fading ? 'welcome-overlay--fading' : ''}`}>
      <div className="welcome-backdrop" />
      <div className="welcome-card">
        <div className="welcome-titlebar">
          <span className="win-dot win-dot--red" />
          <span className="win-dot win-dot--amber" />
          <span className="win-dot win-dot--green" />
        </div>
        <div className="welcome-content">
          <h2 className="welcome-heading">
            Not a <span className="welcome-heading-accent">Linux</span> person? No problem.
          </h2>
          <p className="welcome-sub">
            This portfolio is styled as a Linux desktop environment. Here&apos;s a plain-English
            guide to reading it:
          </p>
          <ul className="welcome-list">
            <li>
              <span className="welcome-icon">🗂️</span>
              <div>
                <div className="welcome-label">
                  <strong>ranger</strong> (left panel)
                </div>
                <div className="welcome-text">
                  My <strong>experience browser</strong> — each <code>.md file</code> is a job role
                  with key achievements inside.
                </div>
              </div>
            </li>
            <li>
              <span className="welcome-icon">📝</span>
              <div>
                <div className="welcome-label">
                  <strong>nvim</strong> (top right)
                </div>
                <div className="welcome-text">
                  A code-styled <strong>bio</strong> — showing my name, degree, and what I&apos;m
                  looking for. Syntax colours are aesthetic.
                </div>
              </div>
            </li>
            <li>
              <span className="welcome-icon">📊</span>
              <div>
                <div className="welcome-label">
                  <strong>btop</strong> (bottom left)
                </div>
                <div className="welcome-text">
                  My <strong>skills dashboard</strong> — bars show proficiency, tags show specific
                  tools within each area.
                </div>
              </div>
            </li>
            <li>
              <span className="welcome-icon">✉️</span>
              <div>
                <div className="welcome-label">
                  <strong>contact.md</strong> (bottom right)
                </div>
                <div className="welcome-text">
                  <strong>Contact &amp; resume</strong> — email, resume links, and a message form to
                  get in touch.
                </div>
              </div>
            </li>
          </ul>
          <p className="welcome-recruiter-tip">
            Not a Linux person? Click workspace <strong>2</strong> at the top left for a clean,
            quick glance recruiter view!
          </p>
          <p className="welcome-footnote">
            Everything is read-only — scroll and explore. The [ 1 ] [ 2 ] [ 3 ] squares at the top
            navigate between sections.
          </p>
        </div>
        <button type="button" className="welcome-button" onClick={() => setFading(true)}>
          [ got it, let me explore → ]
        </button>
      </div>
    </div>
  )
}

