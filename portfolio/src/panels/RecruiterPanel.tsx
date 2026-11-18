import { useState } from 'react'
import resumePdf from '../../Shishir_Sankula_Resume.pdf'
import {
  educationEntry,
  experienceEntries,
  featuredProjects,
  inProgressProjects,
  isTodoHref,
  projectEntries,
  skillGroups,
} from '../data/portfolio'
import { isTodoValue, SITE, STATUS_BADGE } from '../data/site'
import { ContactPanel } from './ContactPanel'
import { NowBuildingStrip, ProjectsPanel } from './ProjectsPanel'

type Props = {
  onOpenTerminal?: () => void
}

export function RecruiterPanel({ onOpenTerminal }: Props) {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const featured = featuredProjects()
  const building = inProgressProjects().filter((p) => p.slug !== 'portfolio-site')
  const projectsToShow = showAllProjects ? projectEntries : featured

  return (
    <main className="overview-root" id="overview-panel" role="tabpanel">
      <section className="overview-hero panel">
        <header className="panel-titlebar">overview.md</header>
        <div className="overview-hero-body">
          <p className="overview-eyebrow">
            <span className="status-dot" aria-hidden="true" /> {STATUS_BADGE}
          </p>
          <h1 className="overview-name">{SITE.name}</h1>
          <p className="overview-title">{SITE.title}</p>
          <p className="overview-pitch">{SITE.pitch}</p>
          <p className="overview-meta">
            {SITE.location}
            {!isTodoValue(SITE.availability) ? ` · ${SITE.availability}` : ''}
          </p>
          <div className="overview-cta">
            <a href={resumePdf} className="overview-btn overview-btn--primary" download>
              [ Download resume ]
            </a>
            <a href={`mailto:${SITE.email}`} className="overview-btn">
              [ Email me ]
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer" className="overview-btn">
              [ GitHub ]
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="overview-btn">
              [ LinkedIn ]
            </a>
          </div>
        </div>
      </section>

      <NowBuildingStrip projects={building} />

      <section className="overview-section panel" aria-labelledby="featured-heading">
        <header className="panel-titlebar" id="featured-heading">
          featured_projects.md
        </header>
        <div className="overview-section-body">
          <ProjectsPanel projects={projectsToShow} />
          {!showAllProjects ? (
            <button
              type="button"
              className="overview-btn overview-view-all"
              onClick={() => setShowAllProjects(true)}
            >
              [ View all projects ]
            </button>
          ) : null}
        </div>
      </section>

      <section className="overview-section panel" aria-labelledby="experience-heading">
        <header className="panel-titlebar" id="experience-heading">
          experience.md
        </header>
        <div className="overview-section-body">
          {experienceEntries.map((entry) => (
            <article key={entry.file} className="overview-experience">
              <h2>
                {entry.role} · {entry.company}
              </h2>
              <p className="overview-period">{entry.period}</p>
              <ul>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="overview-section panel" aria-labelledby="education-heading">
        <header className="panel-titlebar" id="education-heading">
          education.md
        </header>
        <div className="overview-section-body">
          <h2>
            {educationEntry.degree} — {educationEntry.major}
          </h2>
          <p>
            {educationEntry.uni} · {educationEntry.period}
          </p>
          <p className="overview-gpa">
            GPA {educationEntry.gpa.toFixed(2)}/7.00
            {educationEntry.awards.length > 0
              ? ` · ${educationEntry.awards.join(' · ')}`
              : ''}
          </p>
          <ul className="overview-coursework">
            {educationEntry.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="overview-section panel" aria-labelledby="skills-heading">
        <header className="panel-titlebar" id="skills-heading">
          skills.md
        </header>
        <div className="overview-section-body overview-skills">
          {skillGroups.map((skill) => (
            <div key={skill.label} className="overview-skill-group">
              <h2>{skill.label}</h2>
              <p className="overview-skill-tags">{skill.tags.join(' · ')}</p>
              <p className="overview-skill-used">used in: {skill.usedIn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overview-section panel" aria-labelledby="contact-heading">
        <header className="panel-titlebar" id="contact-heading">
          contact.md
        </header>
        <ContactPanel embedded />
      </section>

      {onOpenTerminal ? (
        <p className="overview-terminal-hint">
          Prefer the terminal layout?{' '}
          <button type="button" className="overview-inline-link" onClick={onOpenTerminal}>
            Open Terminal view
          </button>
        </p>
      ) : null}

      {/* Hide TODO-only featured links note for crawlers via data */}
      <span className="sr-only">
        Project links pending:{' '}
        {projectEntries
          .flatMap((p) => p.links)
          .filter((l) => isTodoHref(l.href))
          .map((l) => l.href)
          .join('; ')}
      </span>
    </main>
  )
}
