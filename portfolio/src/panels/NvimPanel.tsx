import { useEffect, useState } from 'react'
import { educationEntry } from '../data/portfolio'
import { SITE, STATUS_BADGE } from '../data/site'

// TODO: add public/headshot.jpg (square, at least 400x400)
const HEADSHOT = '/headshot.jpg'

export function NvimPanel() {
  const [hasHeadshot, setHasHeadshot] = useState(false)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setHasHeadshot(true)
    }
    img.onerror = () => {
      if (!cancelled) setHasHeadshot(false)
    }
    img.src = HEADSHOT
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="panel panel-nvim">
      <header className="panel-titlebar">nvim</header>
      <div className="nvim-body">
        <aside className="nvim-profile">
          <div className="nvim-avatar">
            {hasHeadshot ? (
              <img
                src={HEADSHOT}
                alt={`${SITE.name} headshot`}
                className="nvim-avatar-img"
                width={92}
                height={92}
              />
            ) : (
              <div className="nvim-avatar-inner" aria-hidden="true">
                SS
              </div>
            )}
          </div>
          <div className="nvim-name">{SITE.name}</div>
          <div className="nvim-role">SE Student · UTS &apos;26</div>
          <div className="nvim-status-badge">
            <span className="status-dot" aria-hidden="true" /> {STATUS_BADGE}
          </div>
          <div className="nvim-links">
            <a href={SITE.github} target="_blank" rel="noreferrer" className="nvim-link-pill">
              github
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="nvim-link-pill">
              linkedin
            </a>
          </div>
        </aside>

        <div className="nvim-editor">
          <div className="nvim-code">
            <pre>
              <code>
                <span className="nvim-comment"># About Me</span>
                {'\n'}
                {'\n'}
                <span className="nvim-kw">const</span> <span className="nvim-ident">developer</span>{' '}
                <span className="nvim-op">=</span> {'{'}
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">name</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;{SITE.name}&quot;</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">title</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;{SITE.title}&quot;</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">university</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;UTS · Class of 2026&quot;</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">gpa</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-num">{educationEntry.gpa.toFixed(2)}</span>
                <span className="nvim-op">/</span>
                <span className="nvim-num">7.00</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">passion</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str nvim-str--wrap">
                  [&quot;ML&quot;,
                  {'\n'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;Data Engineering&quot;,
                  {'\n'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;Secure Full-Stack&quot;]
                </span>
                ,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">status</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;Seeking Internship and Graduate Roles&quot;</span>
                {'\n'}
                {'};'}
                {'\n'}
                {'\n'}
                <span className="nvim-comment">// {SITE.pitch}</span>
                {'\n'}
                <span className="nvim-cursor" aria-hidden="true">
                  █
                </span>
              </code>
            </pre>
          </div>
          <div className="nvim-statusline">
            <span className="nvim-mode-pill">NORMAL</span>
            <span className="nvim-status-text">README.md</span>
            <span className="nvim-status-text">unix · utf-8</span>
          </div>
        </div>
      </div>
    </section>
  )
}
