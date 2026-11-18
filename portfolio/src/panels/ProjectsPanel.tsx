import { useId, useState } from 'react'
import { isTodoHref, isTodoText, type ProjectEntry } from '../data/portfolio'

type Props = {
  projects: ProjectEntry[]
  title?: string
  compact?: boolean
  expandSlug?: string | null
}

export function ProjectsPanel({ projects, title, compact = false, expandSlug = null }: Props) {
  return (
    <div className={`projects-panel ${compact ? 'projects-panel--compact' : ''}`}>
      {title ? <h2 className="projects-panel-title">{title}</h2> : null}
      <div className="projects-list">
        {projects.map((project) => {
          const shouldExpand = expandSlug === project.slug
          return (
            <ProjectCard
              key={`${project.slug}-${shouldExpand ? 'open' : 'idle'}`}
              project={project}
              initiallyOpen={shouldExpand}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  initiallyOpen = false,
}: {
  project: ProjectEntry
  initiallyOpen?: boolean
}) {
  const [open, setOpen] = useState(initiallyOpen)
  const regionId = useId()
  const visibleResults = project.result.filter((r) => !isTodoText(r))
  const keyResult = visibleResults[0] ?? ''
  const visibleLinks = project.links.filter((l) => !isTodoHref(l.href))

  return (
    <article className="project-card" id={`project-${project.slug}`}>
      <button
        type="button"
        className="project-card-toggle"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="project-card-header">
          <div>
            <h3 className="project-card-name">{project.name}</h3>
            <p className="project-card-meta">
              {project.role} · {project.period} · {project.status}
            </p>
          </div>
          <span className="project-card-chevron" aria-hidden="true">
            {open ? '▾' : '▸'}
          </span>
        </div>
        <p className="project-card-summary">{project.summary}</p>
        {keyResult ? <p className="project-card-result">{keyResult}</p> : null}
        <div className="project-card-stack">
          {project.stack.map((tag) => (
            <span key={tag} className="project-chip">
              {tag}
            </span>
          ))}
        </div>
      </button>

      <div
        id={regionId}
        role="region"
        hidden={!open}
        className="project-card-body"
      >
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
