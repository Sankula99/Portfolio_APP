import { useId, useRef, useState, type FormEvent } from 'react'
import { isTodoValue, SITE } from '../data/site'

const RESUME_HREF = '/Shishir_Sankula_Resume.pdf'

type FormStatus =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type FieldErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

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
  const nameErrId = useId()
  const emailErrId = useId()
  const subjectErrId = useId()
  const messageErrId = useId()
  const alertId = useId()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const formEnabled = Boolean(FORMSPREE_ID && FORMSPREE_ID.trim())

  const subtitle = [
    SITE.lookingFor,
    !isTodoValue(SITE.startDate) ? SITE.startDate : null,
    !isTodoValue(SITE.workRights) ? SITE.workRights : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Enter your name'
    if (!email.trim()) next.email = 'Enter a valid email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address'
    }
    if (!subject.trim()) next.subject = 'Enter a subject'
    if (!message.trim()) next.message = 'Enter a message'
    return next
  }

  const networkError =
    "Message couldn't be sent. Check your connection and try again, or email me directly."

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formEnabled || !FORMSPREE_ID) return
    if (honeypot.trim()) {
      setStatus({ type: 'error', message: networkError })
      return
    }

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus({ type: 'idle' })
      const order = [
        ['name', nameRef],
        ['email', emailRef],
        ['subject', subjectRef],
        ['message', messageRef],
      ] as const
      for (const [key, ref] of order) {
        if (errors[key]) {
          ref.current?.focus()
          break
        }
      }
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
          _gotcha: honeypot,
        }),
      })

      if (!res.ok) {
        setStatus({ type: 'error', message: networkError })
        return
      }

      setStatus({
        type: 'success',
        message: "Thanks, your message was sent. I'll reply to the email you provided.",
      })
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setFieldErrors({})
      queueMicrotask(() => statusRef.current?.focus())
    } catch {
      setStatus({ type: 'error', message: networkError })
    }
  }

  const body = (
    <div className="contact-panel-body">
      <div className="contact-panel-header">
        <h2 className="contact-panel-heading">Contact</h2>
        <p className="contact-panel-subtitle">{subtitle}</p>
        {!isTodoValue(SITE.linkedinRecommendations) ? (
          <p className="contact-panel-looking">
            <a href={SITE.linkedinRecommendations} target="_blank" rel="noreferrer">
              LinkedIn recommendations
            </a>
          </p>
        ) : null}
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
              [ Download resume ]
            </a>
            <a
              href={RESUME_HREF}
              className="contact-panel-btn contact-panel-btn--secondary"
              target="_blank"
              rel="noreferrer"
            >
              [ View resume ]
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
          <form className="contact-panel-form" onSubmit={(e) => void handleSubmit(e)} noValidate>
            <div className="sr-honeypot" aria-hidden="true">
              <label>
                Leave blank
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            <div className="contact-panel-row">
              <div className="contact-panel-field">
                <label className="contact-panel-label" htmlFor={nameId}>
                  Name
                </label>
                <input
                  id={nameId}
                  ref={nameRef}
                  type="text"
                  name="name"
                  className="contact-panel-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? nameErrId : undefined}
                  disabled={status.type === 'sending'}
                />
                {fieldErrors.name ? (
                  <p id={nameErrId} className="contact-field-error">
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>
              <div className="contact-panel-field">
                <label className="contact-panel-label" htmlFor={subjectId}>
                  Subject
                </label>
                <input
                  id={subjectId}
                  ref={subjectRef}
                  type="text"
                  name="subject"
                  className="contact-panel-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(fieldErrors.subject)}
                  aria-describedby={fieldErrors.subject ? subjectErrId : undefined}
                  disabled={status.type === 'sending'}
                />
                {fieldErrors.subject ? (
                  <p id={subjectErrId} className="contact-field-error">
                    {fieldErrors.subject}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="contact-panel-field">
              <label className="contact-panel-label" htmlFor={emailId}>
                Email
              </label>
              <input
                id={emailId}
                ref={emailRef}
                type="email"
                name="email"
                className="contact-panel-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? emailErrId : undefined}
                disabled={status.type === 'sending'}
              />
              {fieldErrors.email ? (
                <p id={emailErrId} className="contact-field-error">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div className="contact-panel-field">
              <label className="contact-panel-label" htmlFor={messageId}>
                Message
              </label>
              <textarea
                id={messageId}
                ref={messageRef}
                name="message"
                className="contact-panel-textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? messageErrId : undefined}
                disabled={status.type === 'sending'}
              />
              {fieldErrors.message ? (
                <p id={messageErrId} className="contact-field-error">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="contact-panel-submit"
              disabled={status.type === 'sending'}
            >
              {status.type === 'sending' ? '[ Sending… ]' : '[ Send message ]'}
            </button>

            {status.type === 'error' ? (
              <p
                id={alertId}
                className="contact-panel-status contact-panel-status--error"
                role="alert"
              >
                {status.message}
              </p>
            ) : null}
            <p
              ref={statusRef}
              className={
                status.type === 'success'
                  ? 'contact-panel-status contact-panel-status--success'
                  : 'contact-panel-status contact-panel-status--live'
              }
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              {status.type === 'success' ? status.message : ''}
            </p>
          </form>
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
