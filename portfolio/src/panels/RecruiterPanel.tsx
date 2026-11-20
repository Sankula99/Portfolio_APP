import { useState } from 'react'
import {
  educationEntry,
  experienceEntries,
  featuredProjects,
  projectEntries,
  skillGroups,
} from '../data/portfolio'
import { isTodoValue, SITE } from '../data/site'
import { ContactPanel } from './ContactPanel'
import { ProjectsPanel } from './ProjectsPanel'

const RESUME_HREF = '/Shishir_Sankula_Resume.pdf'
const OWL_ALT =
  'Illustration of a steampunk owl in a top hat holding a laptop, the portfolio mascot'

type Props = {
  onOpenTerminal?: () => void
  expandProjectSlug?: string | null
  onExpandChange?: (slug: string | null) => void
}

function formatAwards(awards: string[]): string {
  return awards.map((a) => a.replace(/\((\d+)\)/, '$1')).join(' · ')
}

export function RecruiterPanel({
  onOpenTerminal,
  expandProjectSlug = null,
  onExpandChange,
}: Props) {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const featured = featuredProjects()
  const projectsToShow =
    showAllProjects || expandProjectSlug
      ? projectEntries
      : featured
  const awardsLine = formatAwards(educationEntry.awards)
  const metaParts = [
    SITE.location,
    !isTodoValue(SITE.availability) ? SITE.availability : null,
    !isTodoValue(SITE.workRights) ? SITE.workRights : null,
  ].filter(Boolean)

  const consented = SITE.endorsements.filter((e) => e.consent)

  return (
    <main className="overview-root" id="overview-panel">
      <nav className="overview-jump" aria-label="On this page">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <section className="overview-hero panel" id="overview">
        <header className="panel-titlebar">overview.md</header>
        <div className="overview-hero-body">
          <div className="overview-hero-layout">
            <div className="overview-hero-copy">
              <p className="overview-eyebrow">
                <span className="status-dot" aria-hidden="true" /> {SITE.status}
              </p>
              <h1 className="overview-name">{SITE.name}</h1>
              <p className="overview-title">{SITE.title}</p>
              <p className="overview-pitch">{SITE.pitch}</p>
              <p className="overview-meta">{metaParts.join(' · ')}</p>
              {awardsLine ? (
                <p className="overview-meta overview-meta--secondary">{awardsLine}</p>
              ) : null}
              <div className="overview-cta">
                <a href={RESUME_HREF} className="overview-btn overview-btn--primary" download>
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
            <img
              className="overview-hero-owl"
              src="/hero-owl-480.webp"
              srcSet="/hero-owl-240.webp 240w, /hero-owl-480.webp 480w"
              sizes="(max-width: 899px) 96px, 260px"
              width={460}
              height={460}
              decoding="async"
              alt={OWL_ALT}
            />
          </div>
        </div>
      </section>

      <section
        className="overview-section panel"
        id="experience"
        aria-labelledby="experience-heading"
      >
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

      <section
        className="overview-section panel"
        id="projects"
        aria-labelledby="featured-heading"
      >
        <header className="panel-titlebar" id="featured-heading">
          featured_projects.md
        </header>
        <div className="overview-section-body">
          <ProjectsPanel
            projects={projectsToShow}
            expandSlug={expandProjectSlug}
            onExpandChange={onExpandChange}
          />
          {!showAllProjects && !expandProjectSlug ? (
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

      <section
        className="overview-section panel"
        id="education"
        aria-labelledby="education-heading"
      >
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
            GPA {educationEntry.gpa.toFixed(2)}/7.00 (UTS 7-point scale)
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

      <section
        className="overview-section panel"
        id="skills"
        aria-labelledby="skills-heading"
      >
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

      {consented.length > 0 ? (
        <section
          className="overview-section panel"
          aria-labelledby="endorsements-heading"
        >
          <header className="panel-titlebar" id="endorsements-heading">
            what_people_say.md
          </header>
          <div className="overview-section-body">
            <ul className="overview-endorsements">
              {consented.map((e) => (
                <li key={`${e.name}-${e.org}`}>
                  <blockquote>{e.quote}</blockquote>
                  <p>
                    {e.name}
                    {e.role ? `, ${e.role}` : ''}
                    {e.org ? ` · ${e.org}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section
        className="overview-section panel"
        id="contact"
        aria-labelledby="contact-heading"
      >
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
    </main>
  )
}
