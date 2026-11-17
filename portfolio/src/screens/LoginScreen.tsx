import { useEffect, useState } from 'react'

export function LoginScreen() {
  const [clock, setClock] = useState<string>(() => formatClock(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="login-root">
      <main className="login-card">
        <div className="login-avatar">
          <div className="login-avatar-inner">SS</div>
        </div>

        <h1 className="login-name">Shishir Sankula</h1>

        <div className="login-username-pill">shishir@portfolio</div>

        <div className="login-terminal">
          <p className="login-boot-line">[ OK ] Authenticating session...</p>
          <p className="login-boot-line">[ OK ] Loading Hyprland compositor</p>
          <p className="login-boot-line">
            [ OK ] Portfolio environment ready
            <span className="login-cursor" aria-hidden="true">
              █
            </span>
          </p>
        </div>
      </main>

      <footer className="login-footer">
        <div className="login-footer-left">
          Hyprland 0.47.0 — Arch Linux x86_64 / Hyprland ▾
        </div>
        <div className="login-footer-right">{clock}</div>
      </footer>
    </div>
  )
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}
