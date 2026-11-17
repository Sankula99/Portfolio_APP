import type { ReactNode } from 'react'
import {
  educationEntry,
  experienceEntries,
  projectEntries,
  skillGroups,
  STATUS_BADGE,
} from '../data/portfolio'

const CONTACT = {
  email: 'sankulas99@gmail.com',
  github: 'https://github.com/Sankula99',
  linkedin: 'https://www.linkedin.com/in/shishirsankula',
} as const

export function RecruiterPanel() {
  return (
    <section className="panel panel-recruiter">
      <header className="panel-titlebar">recruiter_view.md</header>
      <div className="recruiter-body">
        <RecruiterRow label="Name" value="Shishir Sankula" />
        <RecruiterRow label="Title" value="Software Engineering Student" />
        <RecruiterRow label="University" value={educationEntry.uni} />
        <RecruiterRow label="WAM" value={educationEntry.wam.toFixed(2)} />
        <RecruiterRow label="Graduation" value="2026" />
        <RecruiterRow
          label="Status"
          value={
            <span className="recruiter-status">
              <span className="status-dot" /> {STATUS_BADGE}
            </span>
          }
        />
        <RecruiterRow
          label="Contact"
          value={
            <span className="recruiter-contact-links">
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {' · '}
              <a href={CONTACT.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {' · '}
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </span>
          }
        />
        <RecruiterRow
          label="Skills"
          value={
            <ul className="recruiter-skills">
              {skillGroups.map((skill) => (
                <li key={skill.label}>
                  {skill.label} — {skill.percent}%
                </li>
              ))}
            </ul>
          }
        />
        <RecruiterRow
          label="Experience"
          value={
            <ul className="recruiter-list">
              {experienceEntries.map((entry) => (
                <li key={entry.file}>
                  {entry.company} · {entry.role} · {entry.period}
                </li>
              ))}
            </ul>
          }
        />
        <RecruiterRow
          label="Projects"
          value={
            <ul className="recruiter-list">
              {projectEntries.map((project) => (
                <li key={project.name}>
                  <strong>{project.name}</strong> — {project.bullets[0]}
                </li>
              ))}
            </ul>
          }
        />
      </div>
    </section>
  )
}

type RecruiterRowProps = {
  label: string
  value: ReactNode
}

function RecruiterRow({ label, value }: RecruiterRowProps) {
  return (
    <div className="recruiter-row">
      <div className="recruiter-label">{label}</div>
      <div className="recruiter-value">{value}</div>
    </div>
  )
}
