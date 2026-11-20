import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import { ContactPanel } from '../panels/ContactPanel'
import { RecruiterPanel } from '../panels/RecruiterPanel'
import { projectEntries } from '../data/portfolio'
import { ProjectsPanel } from '../panels/ProjectsPanel'

const RangerPanel = lazy(() =>
  import('../panels/RangerPanel').then((m) => ({ default: m.RangerPanel })),
)
const NvimPanel = lazy(() =>
  import('../panels/NvimPanel').then((m) => ({ default: m.NvimPanel })),
)
const BtopPanel = lazy(() =>
  import('../panels/BtopPanel').then((m) => ({ default: m.BtopPanel })),
)
const WelcomeOverlay = lazy(() =>
  import('../ui/WelcomeOverlay').then((m) => ({ default: m.WelcomeOverlay })),
)

type DesktopPage = 'recruiter' | 'terminal'

const TERMINAL_TIP_KEY = 'terminalTipSeen'
const OVERVIEW_TAB_ID = 'tab-overview'
const TERMINAL_TAB_ID = 'tab-terminal'
const VIEW_PANEL_ID = 'view-panel'

const SECTION_IDS = new Set([
  'overview',
  'experience',
  'projects',
  'education',
  'skills',
  'contact',
])

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

function parseHash(hash: string): {
  page: DesktopPage
  section: string | null
  projectSlug: string | null
} {
  const raw = hash.replace(/^#/, '')
  if (!raw) return { page: 'recruiter', section: null, projectSlug: null }
  if (raw === 'terminal') return { page: 'terminal', section: null, projectSlug: null }
  if (raw.startsWith('terminal-project-')) {
    return {
      page: 'terminal',
      section: null,
      projectSlug: raw.slice('terminal-project-'.length),
    }
  }
  if (raw === 'overview') return { page: 'recruiter', section: 'overview', projectSlug: null }
  if (raw.startsWith('project-')) {
    return { page: 'recruiter', section: 'projects', projectSlug: raw.slice('project-'.length) }
  }
  if (SECTION_IDS.has(raw)) {
    return { page: 'recruiter', section: raw, projectSlug: null }
  }
  return { page: 'recruiter', section: null, projectSlug: null }
}

function writeHash(next: string, mode: 'push' | 'replace') {
  const value = next.startsWith('#') ? next : `#${next}`
  if (window.location.hash === value) return
  if (mode === 'replace') window.history.replaceState(null, '', value)
  else window.history.pushState(null, '', value)
}

export function DesktopScreen() {
  const initial = parseHash(typeof window !== 'undefined' ? window.location.hash : '')
  const [clock, setClock] = useState<string>(() => formatDesktopClock(new Date()))
  const [page, setPage] = useState<DesktopPage>(initial.page)
  const [showOverlay, setShowOverlay] = useState(false)
  const [expandProjectSlug, setExpandProjectSlug] = useState<string | null>(
    initial.projectSlug,
  )
  const overviewTabRef = useRef<HTMLButtonElement>(null)
  const terminalTabRef = useRef<HTMLButtonElement>(null)
  const overlayTimerRef = useRef<number | null>(null)
  const projectsSectionRef = useRef<HTMLElement>(null)
  const applyingHash = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatDesktopClock(new Date())), 1000)
    return () => {
      window.clearInterval(id)
      if (overlayTimerRef.current !== null) window.clearTimeout(overlayTimerRef.current)
    }
  }, [])

  const scrollToTarget = useCallback(
    (
      targetPage: DesktopPage,
      section: string | null,
      projectSlug: string | null,
      moveCardFocus: boolean,
    ) => {
      window.requestAnimationFrame(() => {
        if (projectSlug) {
          if (targetPage === 'terminal') {
            projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          const el = document.getElementById(`project-${projectSlug}`)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          if (moveCardFocus) {
            ;(el?.querySelector('.project-card-toggle') as HTMLElement | null)?.focus()
          }
          return
        }
        if (targetPage === 'recruiter' && section) {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    },
    [],
  )

  const applyRoute = useCallback(
    (hash: string, opts: { moveTabFocus: boolean; moveCardFocus: boolean }) => {
      const parsed = parseHash(hash)
      applyingHash.current = true
      setPage(parsed.page)
      setExpandProjectSlug(parsed.projectSlug)

      if (parsed.page === 'terminal') {
        if (!readTerminalTipSeen()) {
          if (overlayTimerRef.current !== null) window.clearTimeout(overlayTimerRef.current)
          overlayTimerRef.current = window.setTimeout(() => {
            setShowOverlay(true)
            overlayTimerRef.current = null
          }, 300)
        }
      } else {
        setShowOverlay(false)
      }

      if (opts.moveTabFocus) {
        window.requestAnimationFrame(() => {
          const target = parsed.page === 'recruiter' ? overviewTabRef : terminalTabRef
          target.current?.focus()
        })
      }

      scrollToTarget(parsed.page, parsed.section, parsed.projectSlug, opts.moveCardFocus)
      applyingHash.current = false
    },
    [scrollToTarget],
  )

  useEffect(() => {
    scrollToTarget(initial.page, initial.section, initial.projectSlug, Boolean(initial.projectSlug))
    if (initial.page === 'terminal' && !readTerminalTipSeen()) {
      overlayTimerRef.current = window.setTimeout(() => {
        setShowOverlay(true)
        overlayTimerRef.current = null
      }, 300)
    }

    const onHash = () =>
      applyRoute(window.location.hash, { moveTabFocus: false, moveCardFocus: true })
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only hash listeners
  }, [applyRoute, scrollToTarget])

  const selectPage = useCallback(
    (next: DesktopPage, moveFocus: boolean) => {
      writeHash(next === 'terminal' ? 'terminal' : 'overview', 'push')
      applyRoute(next === 'terminal' ? '#terminal' : '#overview', {
        moveTabFocus: moveFocus,
        moveCardFocus: false,
      })
    },
    [applyRoute],
  )

  const dismissOverlay = useCallback(() => {
    markTerminalTipSeen()
    setShowOverlay(false)
    terminalTabRef.current?.focus()
  }, [])

  const viewProjectDetails = useCallback(
    (slug: string) => {
      writeHash(`terminal-project-${slug}`, 'replace')
      applyingHash.current = true
      setPage('terminal')
      setExpandProjectSlug(slug)
      applyingHash.current = false
      window.requestAnimationFrame(() => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        document
          .getElementById(`project-${slug}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [],
  )

  const onOverviewExpand = useCallback((slug: string | null) => {
    if (applyingHash.current) return
    writeHash(slug ? `project-${slug}` : 'projects', 'replace')
    setExpandProjectSlug(slug)
  }, [])

  const onTerminalExpand = useCallback((slug: string | null) => {
    if (applyingHash.current) return
    writeHash(slug ? `terminal-project-${slug}` : 'terminal', 'replace')
    setExpandProjectSlug(slug)
  }, [])

  const activeTabId = page === 'recruiter' ? OVERVIEW_TAB_ID : TERMINAL_TAB_ID

  return (
    <div className="desktop-root">
      <DesktopTopBar
        clock={clock}
        page={page}
        onSelectPage={selectPage}
        overviewTabRef={overviewTabRef}
        terminalTabRef={terminalTabRef}
      />

      <div role="tabpanel" id={VIEW_PANEL_ID} aria-labelledby={activeTabId}>
        {page === 'recruiter' ? (
          <RecruiterPanel
            onOpenTerminal={() => selectPage('terminal', false)}
            expandProjectSlug={expandProjectSlug}
            onExpandChange={onOverviewExpand}
          />
        ) : (
          <Suspense fallback={null}>
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
                <ProjectsPanel
                  projects={projectEntries}
                  expandSlug={expandProjectSlug}
                  onExpandChange={onTerminalExpand}
                />
              </div>
            </section>

            {showOverlay ? (
              <WelcomeOverlay
                onDismiss={dismissOverlay}
                returnFocusRef={terminalTabRef}
              />
            ) : null}
          </Suspense>
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
      <div
        className="desktop-path"
        title="shishir@arch:~/portfolio"
        aria-label="shishir@arch:~/portfolio"
      >
        <span className="desktop-path-full">shishir@arch:~/portfolio</span>
        <span className="desktop-path-short" aria-hidden="true">
          ~/portfolio
        </span>
      </div>
      <div className="desktop-status">
        <span className="desktop-clock">{clock}</span>
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
