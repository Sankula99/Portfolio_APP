import { useId, useState } from 'react'
import { isTodoValue, SITE } from '../data/site'

const RESUME_HREF = '/Shishir_Sankula_Resume.pdf'

type FormStatus =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type Props = {
  embedded?: boolean
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

function githubHandle(url: string): string {
  return url.replace(/\/$/, '').split('/').pop() ?? url
}

function linkedinHandle(url: string): string {
  return url.replace(/\/$/, '').split('/').pop() ?? url
}

export function ContactPanel({ embedded = false }: Props) {
  const nameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const formEnabled = Boolean(FORMSPREE_ID && FORMSPREE_ID.trim())
  const availability =
    SITE.availability && !isTodoValue(SITE.availability) ? SITE.availability : null

  const handleSubmit = async () => {
    if (!formEnabled || !FORMSPREE_ID) return

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus({ type: 'error', message: '-- error: all fields required --' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus({ type: 'error', message: '-- error: valid email required --' })
      return
    }

    setStatus({ type: 'sending' })

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      })

      if (!res.ok) {
        setStatus({ type: 'error', message: '-- error: send failed — retry --' })
        return
      }

      setStatus({ type: 'success', message: '-- message queued --' })
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setStatus({ type: 'error', message: '-- error: network failure — retry --' })
    }
  }

  const subtitle = [
    'Open to internship and graduate roles',
    SITE.location,
    availability,
  ]
    .filter(Boolean)
    .join(' · ')

  const body = (
    <div className="contact-panel-body">
      <div className="contact-panel-header">
        <h2 className="contact-panel-heading">Contact Me</h2>
        <p className="contact-panel-subtitle">{subtitle}</p>
      </div>

      <div className="contact-panel-links" role="list">
        <div className="contact-kv" role="listitem">
          <span className="contact-kv-key">email</span>
          <a href={`mailto:${SITE.email}`} className="contact-kv-value">
            {SITE.email}
          </a>
        </div>
        <div className="contact-kv" role="listitem">
          <span className="contact-kv-key">resume</span>
          <div className="contact-kv-actions">
            <a href={RESUME_HREF} className="contact-panel-btn" download>
              [ DOWNLOAD ]
            </a>
            <a
              href={RESUME_HREF}
              className="contact-panel-btn contact-panel-btn--secondary"
              target="_blank"
              rel="noreferrer"
            >
              [ VIEW ]
            </a>
          </div>
        </div>
        <div className="contact-kv" role="listitem">
          <span className="contact-kv-key">github</span>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="contact-kv-value">
            {githubHandle(SITE.github)}
          </a>
        </div>
        <div className="contact-kv" role="listitem">
          <span className="contact-kv-key">linkedin</span>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="contact-kv-value">
            {linkedinHandle(SITE.linkedin)}
          </a>
        </div>
      </div>

      <div className="contact-panel-message">
        <p className="contact-panel-prompt" aria-hidden="true">
          $ send a message
        </p>

        {formEnabled ? (
          <div className="contact-panel-form">
            <div className="contact-panel-row">
              <div className="contact-panel-field">
                <label className="contact-panel-label" htmlFor={nameId}>
                  Name
                </label>
                <input
                  id={nameId}
                  type="text"
                  className="contact-panel-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  disabled={status.type === 'sending'}
                />
              </div>
              <div className="contact-panel-field">
                <label className="contact-panel-label" htmlFor={subjectId}>
                  Subject
                </label>
                <input
                  id={subjectId}
                  type="text"
                  className="contact-panel-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  autoComplete="off"
                  required
                  disabled={status.type === 'sending'}
                />
              </div>
            </div>

            <div className="contact-panel-field">
              <label className="contact-panel-label" htmlFor={emailId}>
                Email
              </label>
              <input
                id={emailId}
                type="email"
                className="contact-panel-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={status.type === 'sending'}
              />
            </div>

            <div className="contact-panel-field">
              <label className="contact-panel-label" htmlFor={messageId}>
                Message
              </label>
              <textarea
                id={messageId}
                className="contact-panel-textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status.type === 'sending'}
              />
            </div>

            <button
              type="button"
              className="contact-panel-submit"
              onClick={() => void handleSubmit()}
              disabled={status.type === 'sending'}
            >
              {status.type === 'sending' ? '[ SENDING… ]' : '[ SEND MESSAGE ]'}
            </button>

            {(status.type === 'success' || status.type === 'error') && (
              <p
                className={`contact-panel-status contact-panel-status--${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </div>
        ) : (
          <p className="contact-panel-fallback">Form unavailable. Email me directly.</p>
        )}
      </div>
    </div>
  )

  if (embedded) {
    return <div className="contact-embedded">{body}</div>
  }

  return (
    <section className="panel panel-contact">
      <header className="panel-titlebar">contact.md</header>
      {body}
    </section>
  )
}
