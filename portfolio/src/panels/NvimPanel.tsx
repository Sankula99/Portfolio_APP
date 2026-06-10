export function NvimPanel() {
  return (
    <section className="panel panel-nvim">
      <header className="panel-titlebar">nvim</header>
      <div className="nvim-body">
        <aside className="nvim-profile">
          <div className="nvim-avatar">
            <div className="nvim-avatar-inner">SS</div>
          </div>
          <div className="nvim-name">Shishir Sankula</div>
          <div className="nvim-role">SE Student · UTS &apos;26</div>
          <div className="nvim-status-badge">
            <span className="status-dot" /> seeking internship
          </div>
          <div className="nvim-links">
            <a
              href="https://github.com/Sankula99"
              target="_blank"
              rel="noreferrer"
              className="nvim-link-pill"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/shishirsankula"
              target="_blank"
              rel="noreferrer"
              className="nvim-link-pill"
            >
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
                <span className="nvim-str">&quot;Shishir Sankula&quot;</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">degree</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">
                  &quot;BE (Hons) Software Engineering&quot;
                </span>
                ,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">university</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;UTS · Class of 2026&quot;</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">wam</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-num">79.96</span>,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">passion</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">[&quot;Data-Engineering&quot;,&quot;ML&quot;,&quot;NLP&quot;,&quot;Full-Stack&quot;,&quot;Cybersecurity&quot;]</span>
                ,
                {'\n'}
                &nbsp;&nbsp;
                <span className="nvim-key">status</span>
                <span className="nvim-op">:</span>{' '}
                <span className="nvim-str">&quot;Seeking Internship&quot;</span>
                {'\n'}
                {'};'}
                {'\n'}
                {'\n'}
                <span className="nvim-comment">
                  // Building full-stack apps &amp; training transformer models.
                </span>
                {'\n'}
                <span className="nvim-comment">
                  // Agile team leader · data engineer · ML enthusiast.
                </span>
                {'\n'}
                <span className="nvim-cursor">█</span>
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

