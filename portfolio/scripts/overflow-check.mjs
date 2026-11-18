import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist')
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
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

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('introSeen', '1')
      sessionStorage.setItem('terminalTipSeen', '1')
    } catch {}
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForSelector('.overview-root, .desktop-grid', { timeout: 10000 })

  const overflowOverview = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  )
  results.push({ width, view: 'overview', noOverflow: overflowOverview })
  await page.screenshot({ path: `scripts/shot-${width}-overview.png`, fullPage: true })

  await page.getByRole('tab', { name: 'Terminal' }).click()
  await page.waitForSelector('.desktop-grid', { timeout: 5000 })
  await page.waitForTimeout(400)

  const overflowTerminal = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  )
  results.push({ width, view: 'terminal', noOverflow: overflowTerminal })
  await page.screenshot({ path: `scripts/shot-${width}-terminal.png`, fullPage: true })
  await page.close()
}

await browser.close()
server.close()

console.log(JSON.stringify(results, null, 2))
const failed = results.filter((r) => !r.noOverflow)
process.exit(failed.length ? 1 : 0)
