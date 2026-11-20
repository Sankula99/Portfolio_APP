import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFileSync, existsSync, mkdirSync } from 'fs'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist')
const shotDir = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'tmp-screenshots')
mkdirSync(shotDir, { recursive: true })

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  let filePath = join(root, urlPath === '/' ? 'index.html' : urlPath)
  if (!existsSync(filePath)) {
    res.writeHead(404)
    res.end('not found')
    return
  }
  res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' })
  res.end(readFileSync(filePath))
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()
const base = `http://127.0.0.1:${port}`

const browser = await chromium.launch()
const results = []

async function checkTopBar(page) {
  return page.evaluate(() => {
    const path = document.querySelector('.desktop-path')?.getBoundingClientRect()
    const clock = document.querySelector('.desktop-clock')?.getBoundingClientRect()
    const tabs = document.querySelector('.desktop-workspaces')?.getBoundingClientRect()
    const status = document.querySelector('.desktop-status')?.getBoundingClientRect()
    const pathBox = path
      ? { left: path.left, right: path.right, top: path.top, bottom: path.bottom, width: path.width, height: path.height }
      : null
    const clockBox = clock
      ? { left: clock.left, right: clock.right, top: clock.top, bottom: clock.bottom, width: clock.width, height: clock.height }
      : null
    const tabsBox = tabs
      ? { left: tabs.left, right: tabs.right, top: tabs.top, bottom: tabs.bottom, width: tabs.width, height: tabs.height }
      : null
    const statusBox = status
      ? { left: status.left, right: status.right, top: status.top, bottom: status.bottom, width: status.width, height: status.height }
      : null

    const intersect = (a, b) => {
      if (!a || !b || a.width <= 0 || b.width <= 0) return false
      return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top)
    }

    const pathClockOverlap = intersect(pathBox, clockBox)
    const pathTabsOverlap = intersect(pathBox, tabsBox)
    const tabsClockOverlap = intersect(tabsBox, statusBox)
    const clockVisible = Boolean(clock && clock.width > 8 && clock.right <= window.innerWidth + 1)
    const tabsWrapped =
      tabs &&
      [...document.querySelectorAll('.desktop-workspaces .workspace-pill')].some((el) => {
        const r = el.getBoundingClientRect()
        return Math.abs(r.top - tabs.top) > 4
      })

    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      pathClockOverlap,
      pathTabsOverlap,
      tabsClockOverlap,
      clockVisible,
      tabsWrapped: Boolean(tabsWrapped),
    }
  })
}

const stepWidths = []
for (let w = 320; w <= 1600; w += 40) stepWidths.push(w)
for (const w of [1440, 1280, 1024, 900, 768, 600, 390, 360]) {
  if (!stepWidths.includes(w)) stepWidths.push(w)
}
stepWidths.sort((a, b) => a - b)

for (const width of stepWidths) {
  const page = await browser.newPage({
    viewport: { width, height: width <= 390 ? 844 : 900 },
  })
  await page.addInitScript(() => {
    try {
      localStorage.setItem('introSeen', '1')
      sessionStorage.setItem('terminalTipSeen', '1')
    } catch {}
  })

  for (const view of ['overview', 'terminal']) {
    const url = view === 'overview' ? base : `${base}/#terminal`
    await page.goto(url, { waitUntil: 'networkidle' })
    if (view === 'overview') {
      await page.waitForSelector('.overview-root', { timeout: 10000 })
    } else {
      await page.waitForSelector('.desktop-grid', { timeout: 5000 })
    }
    await page.waitForTimeout(200)
    const topbar = await checkTopBar(page)
    results.push({ width, view, ...topbar })
  }

  await page.close()
}

// Legacy screenshots + seeking checks at key widths
for (const width of [320, 390, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
  })
  await page.addInitScript(() => {
    try {
      localStorage.setItem('introSeen', '1')
      sessionStorage.setItem('terminalTipSeen', '1')
    } catch {}
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForSelector('.overview-root', { timeout: 10000 })
  await page.waitForTimeout(300)
  const metrics = await page.evaluate(() => {
    const seeking = (document.body.innerText.match(/Seeking internship and graduate roles/g) || [])
      .length
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      seeking,
      h1: document.querySelectorAll('h1').length,
    }
  })
  results.push({ width, view: 'overview-shot', ...metrics })
  await page.screenshot({ path: join(shotDir, `overview-${width}.png`), fullPage: false })
  await page.screenshot({ path: join('scripts', `shot-${width}-overview.png`), fullPage: false })

  await page.goto(`${base}/#terminal`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: join(shotDir, `terminal-${width}.png`), fullPage: false })
  await page.screenshot({ path: join('scripts', `shot-${width}-terminal.png`), fullPage: false })
  await page.close()
}

for (const width of [320, 390, 900, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width <= 390 ? 844 : 900 },
  })
  await page.addInitScript(() => {
    try {
      localStorage.setItem('introSeen', '1')
      sessionStorage.setItem('terminalTipSeen', '1')
    } catch {}
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const bar = page.locator('.desktop-topbar')
  await bar.screenshot({ path: join('scripts', `shot-${width}-topbar-overview.png`) })
  await page.goto(`${base}/#terminal`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await bar.screenshot({ path: join('scripts', `shot-${width}-topbar-terminal.png`) })
  await page.close()
}

await browser.close()
server.close()

console.log(JSON.stringify(results, null, 2))
const failed = results.filter(
  (r) =>
    r.overflow ||
    r.pathClockOverlap ||
    r.pathTabsOverlap ||
    r.tabsClockOverlap ||
    r.clockVisible === false ||
    r.tabsWrapped,
)
if (failed.length) {
  console.error('FAIL topbar/overflow:', JSON.stringify(failed, null, 2))
  process.exit(1)
}
process.exit(0)
