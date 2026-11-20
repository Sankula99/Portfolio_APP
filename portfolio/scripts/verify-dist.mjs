import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const htmlPath = resolve(dist, 'index.html')
let failed = false

function fail(msg) {
  console.error(`FAIL: ${msg}`)
  failed = true
}

function ok(msg) {
  console.log(`OK: ${msg}`)
}

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

if (!existsSync(htmlPath)) {
  fail('dist/index.html missing')
  process.exit(1)
}

const html = readFileSync(htmlPath, 'utf8')
const portfolioSrc = readFileSync(resolve(root, 'src/data/portfolio.ts'), 'utf8')
const slugCount = [...portfolioSrc.matchAll(/slug:\s*'/g)].length

const noscriptRaw = html.match(/<noscript>[\s\S]*?<\/noscript>/)?.[0]
if (!noscriptRaw) {
  fail('noscript block missing')
} else {
  ok('noscript present')
  const noscript = decode(noscriptRaw)

  const expRoles = [...portfolioSrc.matchAll(/role:\s*'([^']+)',\s*\n\s*company:/g)].map(
    (m) => m[1],
  )
  for (const role of expRoles) {
    if (!noscript.includes(role)) fail(`noscript missing experience role: ${role}`)
  }

  const projectNames = [
    ...portfolioSrc.matchAll(/slug:\s*'[^']+',\s*\n\s*name:\s*'([^']+)'/g),
  ].map((m) => m[1])
  for (const name of projectNames) {
    if (!noscript.includes(name)) fail(`noscript missing project: ${name}`)
  }

  const skillLabels = [
    ...portfolioSrc.matchAll(
      /label:\s*'(Languages|AI & Data|Security & Networking|Web & Cloud)'/g,
    ),
  ].map((m) => m[1])
  for (const label of skillLabels) {
    if (!noscript.includes(label)) fail(`noscript missing skill group: ${label}`)
  }

  const foundProjects = projectNames.filter((n) => noscript.includes(n)).length
  if (foundProjects !== slugCount) {
    fail(`noscript project count ${foundProjects} != slug count ${slugCount}`)
  } else {
    ok(`noscript projects ${foundProjects}`)
  }
}

if (html.includes('TODO')) fail('dist/index.html contains TODO')
if (html.includes('fonts.googleapis.com')) fail('fonts.googleapis.com present')

const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
)
if (!jsonLdMatch) {
  fail('JSON-LD missing')
} else {
  if (jsonLdMatch[1].includes('mailto:')) fail('mailto: inside JSON-LD')
  try {
    JSON.parse(jsonLdMatch[1])
    ok('JSON-LD valid')
  } catch {
    fail('JSON-LD not valid JSON')
  }
}

const meta = html.match(/name="description"\s+content="([^"]*)"/)?.[1] ?? ''
if (!meta) fail('meta description missing')
else if (meta.length > 155) fail(`meta description length ${meta.length} > 155`)
else ok(`meta description length ${meta.length}`)

const fontsDir = resolve(dist, 'fonts')
const expectedFonts = [
  'jetbrains-mono-400.woff2',
  'jetbrains-mono-500.woff2',
  'jetbrains-mono-600.woff2',
  'syne-600.woff2',
  'syne-700.woff2',
]
if (!existsSync(fontsDir)) {
  fail('dist/fonts missing')
} else {
  const present = new Set(readdirSync(fontsDir))
  for (const f of expectedFonts) {
    if (!present.has(f)) fail(`missing font ${f}`)
  }
  if (expectedFonts.every((f) => present.has(f))) ok('fonts present')
}

for (const pdf of [
  'Shishir_Sankula_Resume.pdf',
  'Hybrid_Deep_Learning_Stress_Detection.pdf',
]) {
  if (!existsSync(resolve(dist, pdf))) fail(`missing PDF ${pdf}`)
  else ok(`PDF ${pdf}`)
}

const resumePdf = resolve(dist, 'Shishir_Sankula_Resume.pdf')
const pdftotext = spawnSync('pdftotext', [resumePdf, '-'], {
  encoding: 'utf8',
  maxBuffer: 2 * 1024 * 1024,
})
if (pdftotext.error && pdftotext.error.code === 'ENOENT') {
  console.log('SKIP: pdftotext not installed; resume truncation check skipped')
} else if (pdftotext.status !== 0) {
  fail(`pdftotext failed: ${pdftotext.stderr || pdftotext.stdout || 'unknown error'}`)
} else {
  const text = pdftotext.stdout ?? ''
  if (/solve real problem(?!s)/i.test(text)) {
    fail('resume PDF still truncates objective ("solve real problem" without trailing s)')
  } else if (/solve real problems/i.test(text)) {
    ok('resume objective ends with "problems"')
  } else {
    console.log('SKIP: pdftotext ran but "solve real problem(s)" not found in resume text')
  }
}

if (failed) process.exit(1)
console.log('verify-dist: all checks passed')
