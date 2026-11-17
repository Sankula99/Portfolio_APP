import {
  educationEntry,
  experienceEntries,
  projectEntries,
  skillGroups,
  STATUS_BADGE,
} from '../data/portfolio'

export function ResumeCrawlData() {
  return (
    <div className="sr-only" aria-label="Full resume and portfolio data">
      <h1>Shishir Sankula — Software Engineering Portfolio</h1>
      <p>
        Software Engineering Student at University of Technology Sydney (UTS), graduating 2026.
        WAM {educationEntry.wam.toFixed(2)}. Status: {STATUS_BADGE}.
      </p>
      <p>
        Contact: sankulas99@gmail.com · GitHub: https://github.com/Sankula99 · LinkedIn:
        https://www.linkedin.com/in/shishirsankula
      </p>

      <section aria-label="Experience">
        <h2>Experience</h2>
        {experienceEntries.map((entry) => (
          <article key={entry.file}>
            <h3>
              {entry.role} at {entry.company}
            </h3>
            <p>{entry.period}</p>
            <ul>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-label="Education">
        <h2>Education</h2>
        <article>
          <h3>
            {educationEntry.degree} — {educationEntry.major}
          </h3>
          <p>
            {educationEntry.uni} · {educationEntry.period} · WAM {educationEntry.wam.toFixed(2)}
          </p>
          <ul>
            {educationEntry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      </section>

      <section aria-label="Projects">
        <h2>Projects</h2>
        {projectEntries.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.period}</p>
            <ul>
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-label="Skills">
        <h2>Skills</h2>
        <ul>
          {skillGroups.map((skill) => (
            <li key={skill.label}>
              {skill.label}: {skill.percent}% — {skill.tags.join(', ')}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
