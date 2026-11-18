import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import {
  educationEntry,
  experienceEntries,
  inProgressProjects,
  projectEntries,
  skillGroups,
} from '../data/portfolio'
import { NowBuildingStrip, ProjectsPanel } from './ProjectsPanel'

type Tab = 'experience' | 'education' | 'projects' | 'skills'

const TABS: Tab[] = ['experience', 'education', 'projects', 'skills']

const HIGHLIGHTS = ['React Native', 'React', 'TypeScript', 'BERT', 'NLP', 'Clerk', 'Supabase'] as const

export function RangerPanel() {
  const [active, setActive] = useState<Tab>('experience')
  const tablistRef = useRef<HTMLDivElement>(null)
  const baseId = useId()

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = TABS.indexOf(active)
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      setActive(TABS[(idx + 1) % TABS.length])
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setActive(TABS[(idx - 1 + TABS.length) % TABS.length])
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(TABS[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(TABS[TABS.length - 1])
    }
  }

  const building = inProgressProjects().filter((p) => p.slug !== 'portfolio-site')

  return (
    <section className="panel panel-ranger">
      <header className="panel-titlebar">ranger</header>
      <div className="ranger-shell">
        <div className="ranger-body">
          <div
            className="ranger-dirs"
            role="tablist"
            aria-label="Portfolio sections"
            aria-orientation="vertical"
            ref={tablistRef}
            onKeyDown={onTabKeyDown}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab}`}
                aria-selected={tab === active}
                aria-controls={`${baseId}-panel-${tab}`}
                className={`ranger-dir ${tab === active ? 'ranger-dir--active' : ''}`}
                onClick={() => setActive(tab)}
                tabIndex={tab === active ? 0 : -1}
              >
                {tab}/
              </button>
            ))}
          </div>
          <div
            className="ranger-content"
            role="tabpanel"
            id={`${baseId}-panel-${active}`}
            aria-labelledby={`${baseId}-tab-${active}`}
          >
            {active === 'experience' && <ExperienceView />}
            {active === 'education' && <EducationView />}
            {active === 'projects' && (
              <ProjectsPanel projects={projectEntries} compact title="projects/" />
            )}
            {active === 'skills' && <SkillsView />}
          </div>
        </div>
        <NowBuildingStrip projects={building} />
      </div>
    </section>
  )
}

function ExperienceView() {
  return (
    <div className="ranger-list">
      {experienceEntries.map((exp) => (
        <article key={exp.file} className="ranger-entry">
          <div className="ranger-file">{exp.file}</div>
          <div className="ranger-role">{exp.role}</div>
          <div className="ranger-meta">
            {exp.company} · {exp.period}
          </div>
          <ul className="ranger-bullets">
            {exp.bullets.map((b) => (
              <li key={b}>{highlightKeywords(b)}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function EducationView() {
  return (
    <div className="ranger-list">
      <article className="ranger-entry">
        <div className="ranger-file">2026_UTS.md</div>
        <div className="ranger-role">{educationEntry.degree}</div>
        <div className="ranger-meta">
          {educationEntry.major} · {educationEntry.uni}
        </div>
        <div className="ranger-meta">
          GPA {educationEntry.gpa.toFixed(2)}/7.00
          {educationEntry.awards.length > 0
            ? ` · ${educationEntry.awards.join(' · ')}`
            : ''}
        </div>
        <ul className="ranger-bullets">
          {educationEntry.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}

function SkillsView() {
  return (
    <div className="ranger-list">
      {skillGroups.map((skill) => (
        <article key={skill.label} className="ranger-entry">
          <div className="ranger-file">{skill.label.toLowerCase().replace(/\s+/g, '_')}.md</div>
          <div className="ranger-role">{skill.label}</div>
          <div className="ranger-meta">{skill.tags.join(' · ')}</div>
          <div className="ranger-meta">used in: {skill.usedIn}</div>
        </article>
      ))}
    </div>
  )
}

function highlightKeywords(text: string): ReactNode {
  const pattern = new RegExp(`(${HIGHLIGHTS.map(escapeRegExp).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    (HIGHLIGHTS as readonly string[]).includes(part) ? (
      <span key={`${part}-${i}`} className="ranger-highlight">
        {part}
      </span>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    ),
  )
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
