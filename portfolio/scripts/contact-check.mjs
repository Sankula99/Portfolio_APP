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
  const filePath = join(root, urlPath === '/' ? 'index.html' : urlPath)
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
  await page.getByRole('tab', { name: 'Terminal' }).click()
  await page.waitForSelector('.panel-contact', { timeout: 8000 })
  await page.waitForTimeout(500)

  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  )

  const contact = page.locator('.panel-contact')
  await contact.screenshot({ path: `scripts/shot-contact-${width}.png` })

  let resumeButtonsOk = true
  if (width === 1440) {
    resumeButtonsOk = await page.evaluate(() => {
      const actions = document.querySelector('.panel-contact .contact-kv-actions')
      if (!actions) return false
      const kids = [...actions.children]
      if (kids.length < 2) return true
      const tops = kids.map((el) => el.getBoundingClientRect().top)
      return Math.max(...tops) - Math.min(...tops) < 2
    })
  }

  results.push({ width, noOverflow, resumeButtonsOk })
  await page.close()
}

await browser.close()
server.close()
console.log(JSON.stringify(results, null, 2))
const failed = results.filter((r) => !r.noOverflow || !r.resumeButtonsOk)
process.exit(failed.length ? 1 : 0)
