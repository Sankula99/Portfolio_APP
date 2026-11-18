import { useId, useState } from 'react'
import resumePdf from '../../Shishir_Sankula_Resume.pdf'
import { SITE } from '../data/site'

type FormStatus =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type Props = {
  embedded?: boolean
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

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

  const body = (
    <div className="contact-panel-body">
      <h2 className="contact-panel-heading">Contact Me</h2>
      <div className="contact-panel-top">
        <a href={`mailto:${SITE.email}`} className="contact-panel-email">
          {SITE.email}
        </a>
        <a href={resumePdf} className="contact-panel-btn" download>
          [ DOWNLOAD RESUME ]
        </a>
        <a
          href={resumePdf}
          className="contact-panel-btn contact-panel-btn--secondary"
          target="_blank"
          rel="noreferrer"
        >
          [ VIEW RESUME ]
        </a>
        <a href={SITE.github} target="_blank" rel="noreferrer" className="nvim-link-pill">
          github
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="nvim-link-pill">
          linkedin
        </a>
      </div>

      {formEnabled ? (
        <div className="contact-panel-form">
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
          <div className="contact-panel-field contact-panel-field--message">
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
        <p className="contact-panel-fallback">
          Prefer email? Write to{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      )}
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
