import { chromium } from '@playwright/test'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const template = path.resolve('scripts/og-template.html')
const output = path.resolve('public/og-image.png')

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})

await page.goto(pathToFileURL(template).href)
await page.screenshot({ path: output })
await browser.close()

console.log(`OG image written to ${output}`)
