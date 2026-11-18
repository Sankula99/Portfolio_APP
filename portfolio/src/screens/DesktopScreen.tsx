import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import { RangerPanel } from '../panels/RangerPanel'
import { NvimPanel } from '../panels/NvimPanel'
import { BtopPanel } from '../panels/BtopPanel'
import { ContactPanel } from '../panels/ContactPanel'
import { RecruiterPanel } from '../panels/RecruiterPanel'
import { WelcomeOverlay } from '../ui/WelcomeOverlay'
import { ResumeCrawlData } from '../ui/ResumeCrawlData'
import { projectEntries } from '../data/portfolio'
import { SITE } from '../data/site'
import { ProjectsPanel } from '../panels/ProjectsPanel'

type DesktopPage = 'recruiter' | 'terminal'

const TERMINAL_TIP_KEY = 'terminalTipSeen'

function readTerminalTipSeen(): boolean {
  try {
    return window.sessionStorage.getItem(TERMINAL_TIP_KEY) === '1'
  } catch {
    return false
  }
}

function markTerminalTipSeen(): void {
  try {
    window.sessionStorage.setItem(TERMINAL_TIP_KEY, '1')
  } catch {
    // ignore
  }
}

export function DesktopScreen() {
  const [clock, setClock] = useState<string>(() => formatDesktopClock(new Date()))
  const [page, setPage] = useState<DesktopPage>('recruiter')
  const [showOverlay, setShowOverlay] = useState(false)
  const [expandProjectSlug, setExpandProjectSlug] = useState<string | null>(null)
  const terminalTabRef = useRef<HTMLButtonElement>(null)
  const overlayTimerRef = useRef<number | null>(null)
  const projectsSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatDesktopClock(new Date())), 1000)
    return () => {
      window.clearInterval(id)
      if (overlayTimerRef.current !== null) window.clearTimeout(overlayTimerRef.current)
    }
  }, [])

  const changePage = useCallback((next: DesktopPage) => {
    setPage(next)
    if (overlayTimerRef.current !== null) {
      window.clearTimeout(overlayTimerRef.current)
      overlayTimerRef.current = null
    }

    if (next === 'recruiter') {
      setShowOverlay(false)
      return
    }

    if (!readTerminalTipSeen()) {
      overlayTimerRef.current = window.setTimeout(() => {
        setShowOverlay(true)
        overlayTimerRef.current = null
      }, 300)
    }
  }, [])

  const dismissOverlay = useCallback(() => {
    markTerminalTipSeen()
    setShowOverlay(false)
    terminalTabRef.current?.focus()
  }, [])

  const viewProjectDetails = useCallback((slug: string) => {
    setExpandProjectSlug(slug)
    window.requestAnimationFrame(() => {
      projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <div className="desktop-root">
      <ResumeCrawlData />
      <DesktopTopBar
        clock={clock}
        page={page}
        onChangePage={changePage}
        terminalTabRef={terminalTabRef}
      />

      {page === 'recruiter' ? (
        <RecruiterPanel onOpenTerminal={() => changePage('terminal')} />
      ) : (
        <>
          <DesktopPathBar />
          <div className="desktop-grid">
            <div className="desktop-col-left desktop-col-left--fixed">
              <RangerPanel onViewProjectDetails={viewProjectDetails} />
            </div>
            <div className="desktop-col-right">
              <NvimPanel />
              <div className="desktop-bottom-row">
                <BtopPanel />
                <ContactPanel />
              </div>
            </div>
          </div>

          <section
            className="panel terminal-projects"
            id="terminal-projects"
            ref={projectsSectionRef}
            aria-label="Project case studies"
          >
            <header className="panel-titlebar">projects.md</header>
            <div className="terminal-projects-body">
              <ProjectsPanel projects={projectEntries} expandSlug={expandProjectSlug} />
            </div>
          </section>

          {showOverlay ? (
            <WelcomeOverlay
              onDismiss={dismissOverlay}
              returnFocusRef={terminalTabRef}
            />
          ) : null}
        </>
      )}
    </div>
  )
}

type TopBarProps = {
  clock: string
  page: DesktopPage
  onChangePage: (page: DesktopPage) => void
  terminalTabRef: RefObject<HTMLButtonElement | null>
}

function DesktopTopBar({ clock, page, onChangePage, terminalTabRef }: TopBarProps) {
  const overviewId = useId()
  const terminalId = useId()
  const tablistRef = useRef<HTMLDivElement>(null)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    onChangePage(page === 'recruiter' ? 'terminal' : 'recruiter')
  }

  return (
    <header className="desktop-topbar">
      <nav
        className="desktop-workspaces"
        role="tablist"
        aria-label="Portfolio views"
        ref={tablistRef}
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          id={overviewId}
          role="tab"
          aria-selected={page === 'recruiter'}
          aria-controls="overview-panel"
          className={`workspace-pill workspace-pill--label ${
            page === 'recruiter' ? 'workspace-pill--active' : ''
          }`}
          onClick={() => onChangePage('recruiter')}
          tabIndex={page === 'recruiter' ? 0 : -1}
        >
          Overview
        </button>
        <button
          type="button"
          id={terminalId}
          role="tab"
          aria-selected={page === 'terminal'}
          aria-controls="terminal-panel"
          className={`workspace-pill workspace-pill--label ${
            page === 'terminal' ? 'workspace-pill--active' : ''
          }`}
          onClick={() => onChangePage('terminal')}
          tabIndex={page === 'terminal' ? 0 : -1}
          ref={terminalTabRef}
        >
          Terminal
        </button>
      </nav>
      <div className="desktop-title">▸ PORTFOLIO</div>
      <div className="desktop-path">shishir@arch:~/portfolio</div>
      <div className="desktop-status">
        <span className="status-dot" aria-hidden="true" /> {SITE.status} · {clock}
      </div>
    </header>
  )
}

function DesktopPathBar() {
  return (
    <div className="desktop-pathbar" id="terminal-panel" role="tabpanel">
      ~/experience · ~/education · ~/projects · ~/skills
    </div>
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
