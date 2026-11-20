import { lazy, Suspense, useId, useState } from 'react'
import { isTodoHref, isTodoText, type ProjectEntry } from '../data/portfolio'

const StressF1Chart = lazy(() =>
  import('../ui/ProjectVisuals').then((m) => ({ default: m.StressF1Chart })),
)
const AwsLampArch = lazy(() =>
  import('../ui/ProjectVisuals').then((m) => ({ default: m.AwsLampArch })),
)

type Props = {
  projects: ProjectEntry[]
  title?: string
  compact?: boolean
  expandSlug?: string | null
  onExpandChange?: (slug: string | null) => void
}

export function ProjectsPanel({
  projects,
  title,
  compact = false,
  expandSlug = null,
  onExpandChange,
}: Props) {
  return (
    <div className={`projects-panel ${compact ? 'projects-panel--compact' : ''}`}>
      {title ? <h2 className="projects-panel-title">{title}</h2> : null}
      <div className="projects-list">
        {projects.map((project) => {
          const shouldExpand = expandSlug === project.slug
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              initiallyOpen={shouldExpand}
              forceOpen={shouldExpand}
              onExpandChange={onExpandChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export function ProjectCard({
  project,
  initiallyOpen = false,
  forceOpen = false,
  onExpandChange,
}: {
  project: ProjectEntry
  initiallyOpen?: boolean
  forceOpen?: boolean
  onExpandChange?: (slug: string | null) => void
}) {
  const [userOpen, setUserOpen] = useState(initiallyOpen)
  const open = forceOpen || userOpen
  const regionId = useId()

  const visibleResults = project.result.filter((r) => !isTodoText(r))
  const visibleLinks = project.links.filter((l) => !isTodoHref(l.href))
  const headline =
    project.headline && !isTodoText(project.headline) ? project.headline : ''
  const showOutcome = Boolean(headline)
  const baseline =
    project.baselineNote && !isTodoText(project.baselineNote)
      ? project.baselineNote
      : null
  const statusNote =
    project.statusNote && !isTodoText(project.statusNote) ? project.statusNote : null
  const imageSrc =
    project.visualSrc && !isTodoHref(project.visualSrc) ? project.visualSrc : null
  const metaParts = [
    !isTodoText(project.role) ? project.role : null,
    !isTodoText(project.period) ? project.period : null,
  ].filter(Boolean)

  const toggle = () => {
    if (open) {
      setUserOpen(false)
      onExpandChange?.(null)
    } else {
      setUserOpen(true)
      onExpandChange?.(project.slug)
    }
  }

  return (
    <article className="project-card" id={`project-${project.slug}`}>
      <button
        type="button"
        className="project-card-toggle"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={toggle}
      >
        <div className="project-card-header">
          <div>
            <h3 className="project-card-name">{project.name}</h3>
            {metaParts.length > 0 || project.status === 'in-progress' ? (
              <p className="project-card-meta">
                {metaParts.join(' · ')}
                {project.status === 'in-progress' ? (
                  <>
                    {metaParts.length > 0 ? ' · ' : null}
                    <span className="project-chip project-chip--status">in progress</span>
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
          <span className="project-card-chevron" aria-hidden="true">
            {open ? '▾' : '▸'}
          </span>
        </div>
        <p className="project-card-summary">{project.summary}</p>
        {statusNote ? <p className="project-card-status-note">{statusNote}</p> : null}
        {showOutcome ? <p className="project-card-result">{headline}</p> : null}
        <div className="project-card-stack">
          {project.stack.map((tag) => (
            <span key={tag} className="project-chip">
              {tag}
            </span>
          ))}
        </div>
      </button>

      {visibleLinks.length > 0 ? (
        <div className="project-card-links project-card-links--collapsed">
          {visibleLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              [{link.label}]
            </a>
          ))}
        </div>
      ) : null}

      <div id={regionId} role="region" hidden={!open} className="project-card-body">
        <section>
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </section>
        <section>
          <h4>Approach</h4>
          <ul>
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {visibleResults.length > 0 ? (
          <section>
            <h4>Result</h4>
            <ul>
              {visibleResults.map((item) => (
                <li key={item} className="project-result-item">
                  {item}
                </li>
              ))}
            </ul>
            {baseline ? <p className="project-baseline">{baseline}</p> : null}
          </section>
        ) : null}
        {project.limitations && project.limitations.length > 0 ? (
          <section>
            <h4>Limitation</h4>
            <ul>
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {project.visual === 'stress-f1-chart' ? (
          <section>
            <h4>Visual</h4>
            <Suspense fallback={null}>
              <StressF1Chart />
            </Suspense>
          </section>
        ) : null}
        {project.visual === 'aws-lamp-arch' ? (
          <section>
            <h4>Visual</h4>
            <Suspense fallback={null}>
              <AwsLampArch />
            </Suspense>
          </section>
        ) : null}
        {imageSrc ? (
          <section>
            <h4>Visual</h4>
            <img
              className="project-visual-img"
              src={imageSrc}
              alt={project.visualAlt ?? project.name}
              width={project.visualWidth ?? 800}
              height={project.visualHeight ?? 450}
              loading="lazy"
            />
          </section>
        ) : null}
        <section>
          <h4>Stack</h4>
          <div className="project-card-stack">
            {project.stack.map((tag) => (
              <span key={tag} className="project-chip">
                {tag}
              </span>
            ))}
          </div>
        </section>
        {visibleLinks.length > 0 ? (
          <section>
            <h4>Links</h4>
            <div className="project-card-links">
              {visibleLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  [{link.label}]
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  )
}

type NowBuildingProps = {
  projects: ProjectEntry[]
}

export function NowBuildingStrip({ projects }: NowBuildingProps) {
  if (projects.length === 0) return null

  return (
    <aside className="now-building" aria-label="Now building">
      <div className="now-building-label">Now building</div>
      <ul className="now-building-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <span className="now-building-dot" aria-hidden="true" />
            <span>
              <strong>{p.name}</strong> — {p.summary}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
