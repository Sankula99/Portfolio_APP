import { projectProcesses, toolsRunning } from '../data/portfolio'

export function HtopPanel() {
  return (
    <section className="panel panel-htop">
      <header className="panel-titlebar">htop</header>
      <div className="htop-body">
        <div className="htop-section">
          <div className="htop-section-title">active projects</div>
          <table className="htop-table">
            <thead>
              <tr>
                <th>PID</th>
                <th>PROJECT</th>
                <th>STACK</th>
                <th>STATE</th>
              </tr>
            </thead>
            <tbody>
              {projectProcesses.map((p) => (
                <tr key={p.pid}>
                  <td>{p.pid}</td>
                  <td>{p.project}</td>
                  <td>{p.stack}</td>
                  <td className={stateClass(p.state)}>{p.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="htop-section">
          <div className="htop-section-title">tools running</div>
          <table className="htop-table">
            <thead>
              <tr>
                <th>PID</th>
                <th>TOOL</th>
                <th>USER</th>
                <th>STATE</th>
              </tr>
            </thead>
            <tbody>
              {toolsRunning.map((t) => (
                <tr key={t.pid}>
                  <td>{t.pid}</td>
                  <td>{t.tool}</td>
                  <td>{t.user}</td>
                  <td className={stateClass(t.state)}>{t.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function stateClass(state: 'R' | 'S' | 'Z') {
  if (state === 'R') return 'htop-state htop-state--running'
  if (state === 'S') return 'htop-state htop-state--sleep'
  return 'htop-state htop-state--zombie'
}

