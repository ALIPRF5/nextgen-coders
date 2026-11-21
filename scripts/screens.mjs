import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const outDir = 'screens-review'
await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge' })
const pages = ['/', '/about', '/events', '/join']
const sizes = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
]

for (const size of sizes) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.isMobile,
    hasTouch: size.hasTouch,
  })
  const page = await context.newPage()
  for (const path of pages) {
    await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: 'networkidle' })
    // Settle lazy images before the full-page shot.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0
        const step = () => {
          y += 400
          window.scrollTo(0, y)
          if (y < document.body.scrollHeight) setTimeout(step, 120)
          else {
            window.scrollTo(0, 0)
            setTimeout(resolve, 300)
          }
        }
        step()
      })
    })
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((img) =>
          img.complete
            ? null
            : new Promise((resolve) => {
                img.onload = resolve
                img.onerror = resolve
              }),
        ),
      ),
    )
    await page.waitForTimeout(200)
    const name = path === '/' ? 'home' : path.slice(1)
    await page.screenshot({ path: `${outDir}/${name}-${size.name}.png`, fullPage: true })
    console.log(`${name}-${size.name}.png`)
  }
  await context.close()
}

await browser.close()
