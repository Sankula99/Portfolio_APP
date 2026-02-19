import { skillGroups } from '../data/portfolio'

export function BtopPanel() {
  return (
    <section className="panel panel-btop">
      <header className="panel-titlebar">btop</header>
      <div className="btop-body">
        {skillGroups.map((skill, index) => (
          <div
            key={skill.label}
            className="btop-row"
            style={{ animationDelay: `${0.6 + index * 0.15}s` }}
          >
            <div className="btop-label">{skill.label}</div>
            <div className="btop-percent">{skill.percent}%</div>
            <div className="btop-bar-track">
              <div className={`btop-bar btop-bar--${skill.variant}`} />
            </div>
            <div className="btop-tags">
              {skill.tags.map((tag) => (
                <span key={tag} className="btop-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

