import { useState } from 'react'
import { educationEntry, experienceEntries, projectEntries } from '../data/portfolio'

type Tab = 'experience' | 'education' | 'projects' | 'skills'

const TABS: Tab[] = ['experience', 'education', 'projects', 'skills']

export function RangerPanel() {
  const [active, setActive] = useState<Tab>('experience')

  return (
    <section className="panel panel-ranger">
      <header className="panel-titlebar">ranger</header>
      <div className="ranger-body">
        <nav className="ranger-dirs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`ranger-dir ${tab === active ? 'ranger-dir--active' : ''}`}
              onClick={() => setActive(tab)}
            >
              {tab}/
            </button>
          ))}
        </nav>
        <div className="ranger-content">
          {active === 'experience' && <ExperienceView />}
          {active === 'education' && <EducationView />}
          {active === 'projects' && <ProjectsView />}
          {active === 'skills' && <SkillsView />}
        </div>
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
              <li key={b} dangerouslySetInnerHTML={{ __html: highlightKeywords(b) }} />
            ))}
          </ul>

          <div className="ranger-skill-row">
            <span className="ranger-skill-label">Skills Used:</span>
            <div className="ranger-tags">
              {exp.skillsUsed.map((tag) => (
                <span key={tag} className="ranger-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="ranger-skill-row">
            <span className="ranger-skill-label">Skills Developed:</span>
            <div className="ranger-tags">
              {exp.skillsDeveloped.map((tag) => (
                <span key={tag} className="ranger-tag ranger-tag--muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
        <div className="ranger-meta">WAM {educationEntry.wam.toFixed(2)}</div>
        <ul className="ranger-bullets">
          {educationEntry.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}

function ProjectsView() {
  return (
    <div className="ranger-list">
      {projectEntries.map((proj) => (
        <article key={proj.name} className="ranger-entry">
          <div className="ranger-file">{proj.name.replace(/\s+/g, '_')}.md</div>
          <div className="ranger-role">{proj.name}</div>
          <div className="ranger-meta">{proj.period}</div>
          <ul className="ranger-bullets">
            {proj.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function SkillsView() {
  return (
    <div className="ranger-list">
      <article className="ranger-entry">
        <div className="ranger-file">skills.md</div>
        <div className="ranger-role">Languages, Frameworks & Tools</div>
        <ul className="ranger-bullets">
          <li>C++, Python, Java, TypeScript, HTML, CSS, SQL</li>
          <li>React, Node.js, React Native, Scikit-Learn, XGBoost, BERT, Pandas</li>
          <li>PostgreSQL, ETL pipelines, Data Warehousing, ML, NLP, Deep Learning</li>
          <li>AWS, Supabase, Git/GitHub, Power BI, Figma, Trello</li>
        </ul>
      </article>
    </div>
  )
}

function highlightKeywords(text: string) {
  const keywords = ['React Native', 'React', 'TypeScript', 'BERT', 'NLP', '5 developers']
  let result = text
  for (const kw of keywords) {
    result = result.replace(kw, `<span class="ranger-highlight">${kw}</span>`)
  }
  return result
}

