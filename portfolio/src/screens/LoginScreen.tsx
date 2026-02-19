import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

type Props = {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: Props) {
  const [password, setPassword] = useState('')
  const [clock, setClock] = useState<string>(() => formatClock(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-root">
      <main className="login-card">
        <div className="login-avatar">
          <div className="login-avatar-inner">SS</div>
        </div>

        <h1 className="login-name">Shishir Sankula</h1>

        <div className="login-username-pill">shishir@portfolio</div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            <span>Password:</span>
            <input
              type="password"
              className="login-input"
              placeholder="········"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="login-btn">
            [ LOGIN ]
          </button>
        </form>

        <p className="login-hint">
          // Hint: type anything as the password and press Login to explore
        </p>
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

