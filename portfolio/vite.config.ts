import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE, isTodoValue } from './src/data/site'
import {
  educationEntry,
  experienceEntries,
  isTodoHref,
  isTodoText,
  projectEntries,
  skillGroups,
} from './src/data/portfolio'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escAttr(s: string) {
  return esc(s).replace(/"/g, '&quot;')
}

function portfolioHtmlPlugin(): Plugin {
  return {
    name: 'portfolio-html-from-data',
    transformIndexHtml(html) {
      const metaDesc = SITE.metaDescription
      if (metaDesc.length > 155) {
        throw new Error(`SITE.metaDescription is ${metaDesc.length} chars (max 155)`)
      }

      const experienceBlocks = experienceEntries
        .map((e) => {
          const bullets = e.bullets
            .filter((b) => !isTodoText(b))
            .map((b) => `<li>${esc(b)}</li>`)
            .join('')
          return `<li><strong>${esc(e.role)}</strong> · ${esc(e.company)} (${esc(e.period)})<ul>${bullets}</ul></li>`
        })
        .join('')

      const awards = educationEntry.awards.filter((a) => !isTodoText(a)).map(esc).join('; ')

      const projects = projectEntries
        .map((p) => {
          const links = p.links
            .filter((l) => !isTodoHref(l.href))
            .map((l) => `<a href="${escAttr(l.href)}">${esc(l.label)}</a>`)
            .join(' · ')
          const headline =
            p.headline && !isTodoText(p.headline) ? ` <em>${esc(p.headline)}</em>` : ''
          const meta = [
            !isTodoText(p.role) ? esc(p.role) : null,
            !isTodoText(p.period) ? esc(p.period) : null,
          ]
            .filter(Boolean)
            .join(' · ')
          return `<li><strong>${esc(p.name)}</strong> — ${esc(p.summary)}${
            meta ? ` · ${meta}` : ''
          }${headline}${links ? ` · ${links}` : ''}</li>`
        })
        .join('')

      const skills = skillGroups
        .map(
          (g) =>
            `<li><strong>${esc(g.label)}</strong>: ${g.tags.map(esc).join(', ')}</li>`,
        )
        .join('')

      const availability =
        SITE.availability && !isTodoValue(SITE.availability) ? SITE.availability : ''
      const workRights =
        SITE.workRights && !isTodoValue(SITE.workRights) ? SITE.workRights : ''

      const noscript = `<noscript>
      <main>
        <h1>${esc(SITE.name)}</h1>
        <p>${esc(SITE.title)} · ${esc(SITE.location)}${availability ? ` · ${esc(availability)}` : ''}${
          workRights ? ` · ${esc(workRights)}` : ''
        }</p>
        <p>${esc(SITE.pitch)}</p>
        <p>Email: <a href="mailto:${escAttr(SITE.email)}">${esc(SITE.email)}</a></p>
        <p>
          <a href="${escAttr(SITE.github)}">GitHub</a> ·
          <a href="${escAttr(SITE.linkedin)}">LinkedIn</a> ·
          <a href="/${escAttr(SITE.resumeFile)}">Resume PDF</a>
        </p>
        <h2>Experience</h2>
        <ul>${experienceBlocks}</ul>
        <h2>Education</h2>
        <p>${esc(educationEntry.degree)} — ${esc(educationEntry.major)}. ${esc(educationEntry.uni)}. GPA ${esc(String(educationEntry.gpa))}/7.00 (UTS 7-point scale).${
          awards ? ` Awards: ${awards}.` : ''
        }</p>
        <h2>Projects</h2>
        <ul>${projects}</ul>
        <h2>Skills</h2>
        <ul>${skills}</ul>
      </main>
    </noscript>`

      const jsonLd = `{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": ${JSON.stringify(SITE.name)},
        "jobTitle": ${JSON.stringify(SITE.title)},
        "email": ${JSON.stringify(SITE.email)},
        "sameAs": [
          ${JSON.stringify(SITE.github)},
          ${JSON.stringify(SITE.linkedin)}
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "University of Technology Sydney"
        }
      }`

      return html
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
          `<meta name="description" content="${escAttr(metaDesc)}" />`,
        )
        .replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
          `<meta property="og:description" content="${escAttr(metaDesc)}" />`,
        )
        .replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
          `<meta name="twitter:description" content="${escAttr(metaDesc)}" />`,
        )
        .replace(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
          `<script type="application/ld+json">\n      ${jsonLd}\n    </script>`,
        )
        .replace(/<noscript>[\s\S]*?<\/noscript>/, noscript)
    },
  }
}

export default defineConfig({
  plugins: [react(), portfolioHtmlPlugin()],
})
