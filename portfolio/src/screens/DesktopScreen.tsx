import { useEffect, useState } from 'react'
import { RangerPanel } from '../panels/RangerPanel'
import { NvimPanel } from '../panels/NvimPanel'
import { BtopPanel } from '../panels/BtopPanel'
import { HtopPanel } from '../panels/HtopPanel'
import { WelcomeOverlay } from '../ui/WelcomeOverlay'
import resumePdf from '../../SoftwareResumV4.9.pdf'

type DesktopPage = 'main' | 'contact'

export function DesktopScreen() {
  const [clock, setClock] = useState<string>(() => formatDesktopClock(new Date()))
  const [showOverlay, setShowOverlay] = useState(false)
  const [page, setPage] = useState<DesktopPage>('main')

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatDesktopClock(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => setShowOverlay(true), 400)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="desktop-root">
      <DesktopTopBar clock={clock} page={page} onChangePage={setPage} />

      {page === 'main' ? (
        <>
          <DesktopPathBar />
          <div className="desktop-grid">
            <div className="desktop-col-left">
              <RangerPanel />
            </div>
            <div className="desktop-col-right">
              <NvimPanel />
              <div className="desktop-bottom-row">
                <BtopPanel />
                <div className="desktop-bottom-right">
                  <HtopPanel />
                  <ContactMini />
                </div>
              </div>
            </div>
          </div>

          {showOverlay && <WelcomeOverlay onDismiss={() => setShowOverlay(false)} />}
        </>
      ) : (
        <ContactPage />
      )}
    </div>
  )
}

type TopBarProps = {
  clock: string
  page: DesktopPage
  onChangePage: (page: DesktopPage) => void
}

function DesktopTopBar({ clock, page, onChangePage }: TopBarProps) {
  return (
    <header className="desktop-topbar">
      <div className="desktop-workspaces">
        <button
          type="button"
          className={`workspace-pill ${page === 'main' ? 'workspace-pill--active' : ''}`}
          onClick={() => onChangePage('main')}
        >
          1
        </button>
        <button
          type="button"
          className={`workspace-pill ${page === 'contact' ? 'workspace-pill--active' : ''}`}
          onClick={() => onChangePage('contact')}
        >
          2
        </button>
        <span className="workspace-pill">3</span>
      </div>
      <div className="desktop-title">▸ PORTFOLIO</div>
      <div className="desktop-path">shishir@arch:~/portfolio</div>
      <div className="desktop-status">
        <span className="status-dot" /> seeking internship · {clock}
      </div>
    </header>
  )
}

function DesktopPathBar() {
  return <div className="desktop-pathbar">~/experience · ~/education · ~/projects · ~/skills</div>
}

function ContactPage() {
  return (
    <div className="contact-root">
      <section className="panel contact-panel">
        <header className="panel-titlebar">contact.md</header>
        <div className="contact-body">
          <div className="contact-info">
            <h2 className="contact-heading">Contact &amp; Resume</h2>
            <p className="contact-email">sankulas99@gmail.com</p>

            <div className="contact-actions">
              <a href={resumePdf} className="contact-btn" download>
                [ Download Resume ]
              </a>
              <a
                href={resumePdf}
                className="contact-btn contact-btn--secondary"
                target="_blank"
                rel="noreferrer"
              >
                [ View Resume ]
              </a>
            </div>

            <div className="contact-links">
              <a
                href="https://github.com/Sankula99"
                target="_blank"
                rel="noreferrer"
                className="nvim-link-pill"
              >
                github
              </a>
              <a
                href="https://www.linkedin.com/in/shishirsankula"
                target="_blank"
                rel="noreferrer"
                className="nvim-link-pill"
              >
                linkedin
              </a>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="contact-field">
              <label>
                <span>Name</span>
                <input type="text" placeholder="Your name" />
              </label>
            </div>
            <div className="contact-field">
              <label>
                <span>Email</span>
                <input type="email" placeholder="you@example.com" />
              </label>
            </div>
            <div className="contact-field">
              <label>
                <span>Subject</span>
                <input type="text" placeholder="What would you like to chat about?" />
              </label>
            </div>
            <div className="contact-field">
              <label>
                <span>Message</span>
                <textarea rows={5} placeholder="Type your message here..." />
              </label>
            </div>
            <button type="submit" className="contact-submit">
              [ Send Message ]
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function ContactMini() {
  return (
    <section className="panel contact-mini">
      <header className="panel-titlebar">contact_min.md</header>
      <div className="contact-mini-body">
        <div className="contact-mini-main">
          <div className="contact-mini-heading">Get in touch</div>
          <div className="contact-mini-email">sankulas99@gmail.com</div>
        </div>

        <div className="contact-mini-actions">
          <a href={resumePdf} className="contact-mini-btn" download>
            [ Download Resume ]
          </a>
          <a
            href={resumePdf}
            className="contact-mini-btn contact-mini-btn--secondary"
            target="_blank"
            rel="noreferrer"
          >
            [ View Resume ]
          </a>
        </div>

        <div className="contact-mini-links">
          <a
            href="https://github.com/Sankula99"
            target="_blank"
            rel="noreferrer"
            className="nvim-link-pill"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/shishirsankula"
            target="_blank"
            rel="noreferrer"
            className="nvim-link-pill"
          >
            linkedin
          </a>
        </div>

        <p className="contact-mini-note">Full contact &amp; form on workspace [2].</p>
      </div>
    </section>
  )
}

function formatDesktopClock(date: Date) {
  const time = new Intl.DateTimeFormat('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

  const day = new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: '2-digit',
  }).format(date)

  return `${time} · ${day}`
}

