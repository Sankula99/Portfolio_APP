import { useEffect, useState } from 'react'
import { RangerPanel } from '../panels/RangerPanel'
import { NvimPanel } from '../panels/NvimPanel'
import { BtopPanel } from '../panels/BtopPanel'
import { ContactPanel } from '../panels/ContactPanel'
import { RecruiterPanel } from '../panels/RecruiterPanel'
import { WelcomeOverlay } from '../ui/WelcomeOverlay'
import { ResumeCrawlData } from '../ui/ResumeCrawlData'
import { STATUS_BADGE } from '../data/portfolio'

type DesktopPage = 'main' | 'recruiter'

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
      <ResumeCrawlData />
      <DesktopTopBar clock={clock} page={page} onChangePage={setPage} />
      <p className="desktop-hint">
        Not a Linux person? Click workspace <strong>2</strong> at the top left for a clean, quick
        glance recruiter view!
      </p>

      {page === 'main' ? (
        <>
          <DesktopPathBar />
          <div className="desktop-grid">
            <div className="desktop-col-left desktop-col-left--fixed">
              <RangerPanel />
            </div>
            <div className="desktop-col-right">
              <NvimPanel />
              <div className="desktop-bottom-row">
                <BtopPanel />
                <ContactPanel />
              </div>
            </div>
          </div>

          {showOverlay && <WelcomeOverlay onDismiss={() => setShowOverlay(false)} />}
        </>
      ) : (
        <div className="recruiter-root">
          <RecruiterPanel />
        </div>
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
          className={`workspace-pill ${page === 'recruiter' ? 'workspace-pill--active' : ''}`}
          onClick={() => onChangePage('recruiter')}
        >
          2
        </button>
        <span className="workspace-pill">3</span>
      </div>
      <div className="desktop-title">▸ PORTFOLIO</div>
      <div className="desktop-path">shishir@arch:~/portfolio</div>
      <div className="desktop-status">
        <span className="status-dot" /> {STATUS_BADGE} · {clock}
      </div>
    </header>
  )
}

function DesktopPathBar() {
  return <div className="desktop-pathbar">~/experience · ~/education · ~/projects · ~/skills</div>
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
