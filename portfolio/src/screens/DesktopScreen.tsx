import {
  useCallback,
  useEffect,
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
const OVERVIEW_TAB_ID = 'tab-overview'
const TERMINAL_TAB_ID = 'tab-terminal'
const VIEW_PANEL_ID = 'view-panel'

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
  const overviewTabRef = useRef<HTMLButtonElement>(null)
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

  const selectPage = useCallback(
    (next: DesktopPage, moveFocus: boolean) => {
      changePage(next)
      if (!moveFocus) return
      window.requestAnimationFrame(() => {
        const target = next === 'recruiter' ? overviewTabRef : terminalTabRef
        target.current?.focus()
      })
    },
    [changePage],
  )

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

  const activeTabId = page === 'recruiter' ? OVERVIEW_TAB_ID : TERMINAL_TAB_ID

  return (
    <div className="desktop-root">
      <ResumeCrawlData />
      <DesktopTopBar
        clock={clock}
        page={page}
        onSelectPage={selectPage}
        overviewTabRef={overviewTabRef}
        terminalTabRef={terminalTabRef}
      />

      <div role="tabpanel" id={VIEW_PANEL_ID} aria-labelledby={activeTabId}>
        {page === 'recruiter' ? (
          <RecruiterPanel onOpenTerminal={() => selectPage('terminal', false)} />
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
    </div>
  )
}

type TopBarProps = {
  clock: string
  page: DesktopPage
  onSelectPage: (page: DesktopPage, moveFocus: boolean) => void
  overviewTabRef: RefObject<HTMLButtonElement | null>
  terminalTabRef: RefObject<HTMLButtonElement | null>
}

function DesktopTopBar({
  clock,
  page,
  onSelectPage,
  overviewTabRef,
  terminalTabRef,
}: TopBarProps) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      onSelectPage(page === 'recruiter' ? 'terminal' : 'recruiter', true)
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      onSelectPage('recruiter', true)
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      onSelectPage('terminal', true)
    }
  }

  return (
    <header className="desktop-topbar">
      <div
        className="desktop-workspaces"
        role="tablist"
        aria-label="Portfolio views"
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          id={OVERVIEW_TAB_ID}
          role="tab"
          aria-selected={page === 'recruiter'}
          aria-controls={VIEW_PANEL_ID}
          className={`workspace-pill workspace-pill--label ${
            page === 'recruiter' ? 'workspace-pill--active' : ''
          }`}
          onClick={() => onSelectPage('recruiter', false)}
          tabIndex={page === 'recruiter' ? 0 : -1}
          ref={overviewTabRef}
        >
          Overview
        </button>
        <button
          type="button"
          id={TERMINAL_TAB_ID}
          role="tab"
          aria-selected={page === 'terminal'}
          aria-controls={VIEW_PANEL_ID}
          className={`workspace-pill workspace-pill--label ${
            page === 'terminal' ? 'workspace-pill--active' : ''
          }`}
          onClick={() => onSelectPage('terminal', false)}
          tabIndex={page === 'terminal' ? 0 : -1}
          ref={terminalTabRef}
        >
          Terminal
        </button>
      </div>
      <div className="desktop-title">▸ PORTFOLIO</div>
      <div className="desktop-path">shishir@arch:~/portfolio</div>
      <div className="desktop-status">
        <span className="status-dot" aria-hidden="true" />
        <span>
          {SITE.status} · {clock}
        </span>
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
