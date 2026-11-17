import { useState } from 'react'
import resumePdf from '../../SoftwareResumV4.9.pdf'

type FormStatus = { type: 'error' | 'success'; message: string } | null

export function ContactPanel() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>(null)

  const handleSubmit = () => {
    if (!name.trim() || !subject.trim() || !message.trim()) {
      setStatus({ type: 'error', message: '-- error: all fields required --' })
      return
    }

    setStatus({ type: 'success', message: '-- message queued --' })
    setName('')
    setSubject('')
    setMessage('')
  }

  return (
    <section className="panel panel-contact">
      <header className="panel-titlebar">contact.md</header>
      <div className="contact-panel-body">
        <h2 className="contact-panel-heading">Contact Me</h2>
        <div className="contact-panel-top">
          <a href="mailto:sankulas99@gmail.com" className="contact-panel-email">
            sankulas99@gmail.com
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

        <div className="contact-panel-form">
          <div className="contact-panel-field">
            <span className="contact-panel-label">Name</span>
            <input
              type="text"
              className="contact-panel-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="contact-panel-field">
            <span className="contact-panel-label">Subject</span>
            <input
              type="text"
              className="contact-panel-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="contact-panel-field contact-panel-field--message">
            <span className="contact-panel-label">Message</span>
            <textarea
              className="contact-panel-textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="button" className="contact-panel-submit" onClick={handleSubmit}>
            [ SEND MESSAGE ]
          </button>
          {status && (
            <p
              className={`contact-panel-status contact-panel-status--${status.type}`}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
