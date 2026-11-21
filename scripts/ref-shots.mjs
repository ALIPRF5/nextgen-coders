import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('https://nextgencoder.org/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.screenshot({ path: 'C:/Users/aliel/AppData/Local/Temp/opencode/ref-top.png' })

await page.evaluate(() => window.scrollTo(0, 1500))
await page.waitForTimeout(1800)
await page.screenshot({ path: 'C:/Users/aliel/AppData/Local/Temp/opencode/ref-mid.png' })

await page.evaluate(() => window.scrollTo(0, 3200))
await page.waitForTimeout(1800)
await page.screenshot({ path: 'C:/Users/aliel/AppData/Local/Temp/opencode/ref-mid2.png' })

const blobs = await page.evaluate(() =>
  [...document.querySelectorAll('.blob')].slice(0, 3).map((el) => {
    const s = getComputedStyle(el)
    return { bg: s.backgroundImage, size: s.width + 'x' + s.height, filter: s.filter, opacity: s.opacity, pos: s.position }
  }),
)
console.log(JSON.stringify(blobs, null, 2))
await browser.close()
