import { projectCountForSkill, skillGroups } from '../data/portfolio'

export function BtopPanel() {
  const maxCount = Math.max(
    1,
    ...skillGroups.map((skill) => projectCountForSkill(skill.label)),
  )

  return (
    <section className="panel panel-btop">
      <header className="panel-titlebar">btop</header>
      <div className="btop-body">
        <p className="btop-caption">
          Bars show the number of projects using each skill group.
        </p>
        {skillGroups.map((skill, index) => {
          const count = projectCountForSkill(skill.label)
          const widthPct = Math.round((count / maxCount) * 100)

          return (
            <div
              key={skill.label}
              className="btop-row"
              style={{ animationDelay: `${0.6 + index * 0.15}s` }}
            >
              <div className="btop-label">{skill.label}</div>
              <div className="btop-percent">
                {count} project{count === 1 ? '' : 's'}
              </div>
              <div className="btop-bar-track">
                <div
                  className={`btop-bar btop-bar--${skill.variant}`}
                  style={{ ['--bar-width' as string]: `${widthPct}%` }}
                />
              </div>
              <div className="btop-tags">
                {skill.tags.map((tag) => (
                  <span key={tag} className="btop-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="btop-used-in">used in: {skill.usedIn}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
