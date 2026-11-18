import {
  educationEntry,
  experienceEntries,
  isTodoText,
  projectEntries,
  skillGroups,
} from '../data/portfolio'
import { SITE } from '../data/site'

export function ResumeCrawlData() {
  return (
    <div className="sr-only" aria-label="Full resume and portfolio data">
      <h1>
        {SITE.name} — {SITE.title}
      </h1>
      <p>
        {SITE.pitch} Location: {SITE.location}. Status: {SITE.status}. GPA{' '}
        {educationEntry.gpa.toFixed(2)}/7.00.
      </p>
      <p>
        Contact: {SITE.email} · GitHub: {SITE.github} · LinkedIn: {SITE.linkedin}
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
            {educationEntry.uni} · {educationEntry.period} · GPA{' '}
            {educationEntry.gpa.toFixed(2)}/7.00
          </p>
          {educationEntry.awards.length > 0 ? (
            <p>Awards: {educationEntry.awards.join(', ')}</p>
          ) : null}
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
          <article key={project.slug}>
            <h3>{project.name}</h3>
            <p>
              {project.role} · {project.period} · {project.status}
            </p>
            <p>{project.summary}</p>
            <p>Problem: {project.problem}</p>
            <ul>
              {project.result
                .filter((item) => !isTodoText(item))
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
            <p>Stack: {project.stack.join(', ')}</p>
          </article>
        ))}
      </section>

      <section aria-label="Skills">
        <h2>Skills</h2>
        <ul>
          {skillGroups.map((skill) => (
            <li key={skill.label}>
              {skill.label}: {skill.tags.join(', ')}. Used in: {skill.usedIn}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
