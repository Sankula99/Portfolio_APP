import { educationEntry } from '../data/portfolio'
import { SITE, wrapPitchLines } from '../data/site'

const OWL_ALT =
  'Illustration of a steampunk owl in a top hat holding a laptop, the portfolio mascot'
const pitchLines = wrapPitchLines(SITE.pitch, 66)

export function NvimPanel() {
  return (
    <section className="panel panel-nvim">
      <header className="panel-titlebar">nvim</header>
      <div className="nvim-body">
        <aside className="nvim-profile">
          <div className="nvim-avatar">
            <img
              src="/hero-owl-240.webp"
              srcSet="/hero-owl-240.webp 240w, /hero-owl-480.webp 480w"
              sizes="120px"
              alt={OWL_ALT}
              className="nvim-avatar-img"
              width={120}
              height={120}
              decoding="async"
            />
          </div>
          <h1 className="nvim-name">{SITE.name}</h1>
          <div className="nvim-role">SE Student · UTS &apos;26</div>
          <div className="nvim-status-badge">
            <span className="status-dot" aria-hidden="true" /> {SITE.status}
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
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;Cybersecurity&quot;,
                  {'\n'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;Secure Full-Stack&quot;]
                </span>
                ,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">status</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;{SITE.status}&quot;</span>
                {'\n'}
                {'};'}
                {'\n'}
                {'\n'}
                {pitchLines.map((line) => (
                  <span key={line} className="nvim-comment">
                    {`// ${line}`}
                    {'\n'}
                  </span>
                ))}
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
