// Builds every photo/logo derivative the site needs from the club's original assets.
// Usage:
//   node scripts/optimize-images.mjs --assets "C:\path\to\NEXT GEN CODERS FILE"
// The asset folder must contain the LOGO OF THE CLUB and PHOTOS OF ... folders.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const assetsIndex = args.indexOf('--assets')
const ASSETS = path.resolve(assetsIndex >= 0 ? args[assetsIndex + 1] : process.cwd())
const OUT = path.resolve('public/images')
const ORANGE = '#FEA901'

const dirs = {
  logo: 'LOGO OF THE CLUB',
  health: 'PHOTOS OF HEALTH BIO MEDICAL HACKATHON',
  computing: 'PHOTOS OF COMPUTING DAY',
  n8n: 'PHOTOS OF N8N FORMATION',
  website: 'PHOTOS OF THE HACKATHON OF THE BEST REBUILD OF THE SCHOL WEBSITE',
  integration: 'PHOTOS OF INTEGRATION JOURNEY',
  bmce: 'PHOTOS OF THE MEETING WITH BMCE',
  board: 'BOARD PHOTOS',
}

const src = (dir, file) => path.join(ASSETS, dirs[dir], file)
const out = (name) => path.join(OUT, name)

async function cropResize(input, output, { width, height, left = 0, top = 0, resizeWidth, quality = 78 }) {
  const target = resizeWidth ?? width
  await sharp(input)
    .rotate()
    .extract({ left, top, width, height })
    .resize({ width: 2 * Math.round(target / 2), withoutEnlargement: false })
    .webp({ quality, effort: 6 })
    .toFile(output)
  const { size } = await fs.stat(output)
  console.log(`${path.basename(output).padEnd(30)} ${Math.round(size / 1024)} KB`)
}

// Gallery photos keep their original framing: only the long edge is capped.
async function resizePhoto(input, output, { maxWidth = 900, maxHeight = 1100, quality = 76 } = {}) {
  await sharp(input)
    .rotate()
    .resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output)
  const { size } = await fs.stat(output)
  console.log(`${path.basename(output).padEnd(30)} ${Math.round(size / 1024)} KB`)
}

// Hero slideshow photos: full source resolution so they stay crisp on wide screens.
async function heroPhoto(input, output, { left = 0, top = 0, width, height, quality = 80 }) {
  await sharp(input)
    .rotate()
    .extract({ left, top, width, height })
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output)
  const { size, ...rest } = await fs.stat(output)
  console.log(`${path.basename(output).padEnd(30)} ${Math.round(size / 1024)} KB`)
}

async function makeEmblem() {
  const logo = await sharp(src('logo', 'Untitled design(1).png'))
    .extract({ left: 375, top: 462, width: 316, height: 306 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Key out the near-black background so the emblem sits on any dark surface.
  const { data, info } = logo
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r < 26 && g < 26 && b < 26) data[i + 3] = 0
  }

  const emblem = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  await sharp(emblem)
    .png({ palette: true, colours: 64, compressionLevel: 9 })
    .toFile(out('logo-mark.png'))
  console.log('logo-mark.png                 512px transparent')
  return emblem
}

async function makeFavicons(emblem) {
  // Rounded dark tile + emblem, so the mark stays readable at 16–32 px.
  const size = 512
  const tile = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="112" fill="#0A0A0A"/>
      <rect x="6" y="6" width="${size - 12}" height="${size - 12}" rx="106" fill="none" stroke="${ORANGE}" stroke-width="10" stroke-opacity="0.55"/>
    </svg>`,
  )
  const icon = await sharp(tile)
    .composite([{ input: await sharp(emblem).resize(392, 392, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(), gravity: 'center' }])
    .png()
    .toBuffer()

  for (const [name, px] of [
    ['favicon-32.png', 32],
    ['favicon-192.png', 192],
    ['apple-touch-icon.png', 180],
  ]) {
    await sharp(icon).resize(px, px).png({ compressionLevel: 9 }).toFile(out(name))
    console.log(`${name.padEnd(30)} ${px}px`)
  }
}

async function makePoster(emblem) {
  const emblemB64 = emblem.toString('base64')
  const svg = `<svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="78%" cy="50%" r="46%">
        <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="750" fill="#0A0A0A"/>
    <rect width="1200" height="750" fill="url(#grid)"/>
    <rect width="1200" height="750" fill="url(#glow)"/>
    <circle cx="900" cy="375" r="255" fill="none" stroke="${ORANGE}" stroke-opacity="0.22" stroke-width="2"/>
    <circle cx="900" cy="375" r="310" fill="none" stroke="${ORANGE}" stroke-opacity="0.10" stroke-width="2"/>
    <image href="data:image/png;base64,${emblemB64}" x="700" y="175" width="400" height="400"/>
    <text x="80" y="105" font-family="Consolas, 'Courier New', monospace" font-size="19" letter-spacing="4" fill="#A3A3A3">NEXTGEN CODERS · EST LAÂYOUNE</text>
    <text x="80" y="230" font-family="'Segoe UI', Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="3" fill="${ORANGE}">HACKATHON</text>
    <text x="76" y="352" font-family="'Segoe UI', Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-2" fill="#FFFFFF">AVRIL 2027</text>
    <text x="80" y="400" font-family="Consolas, 'Courier New', monospace" font-size="18" letter-spacing="3" fill="${ORANGE}">DATE À CONFIRMER</text>
    <line x1="80" y1="470" x2="560" y2="470" stroke="${ORANGE}" stroke-width="2" stroke-opacity="0.4"/>
    <text x="80" y="530" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="600" fill="#FFFFFF">6 équipes · 25 participants</text>
    <text x="80" y="574" font-family="'Segoe UI', Arial, sans-serif" font-size="24" fill="#A3A3A3">Le meilleur site de club.</text>
    <rect x="80" y="650" width="120" height="6" fill="${ORANGE}"/>
    <text x="1120" y="656" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="16" letter-spacing="3" fill="#6B6B6B">VISUEL · 2026</text>
  </svg>`

  await sharp(Buffer.from(svg)).webp({ quality: 88, effort: 6 }).toFile(out('upcoming-hackathon.webp'))
  const { size } = await fs.stat(out('upcoming-hackathon.webp'))
  console.log(`${'upcoming-hackathon.webp'.padEnd(30)} ${Math.round(size / 1024)} KB`)
}

await fs.mkdir(OUT, { recursive: true })

// Hero — three members around a laptop during the integration day.
await cropResize(src('integration', 'WhatsApp Image 2026-11-16 at 2.49.25 AM (1).jpeg'), out('hero-club.webp'), {
  left: 0,
  top: 110,
  width: 1066,
  height: 1332,
  resizeWidth: 1000,
})
// Small variant for phones: same 4:5 crop, 640 px wide.
await sharp(out('hero-club.webp')).resize({ width: 640 }).webp({ quality: 74, effort: 6 }).toFile(out('hero-club-sm.webp'))

// Hero slideshow — five wide frames at full resolution, shown behind the home headline.
await heroPhoto(src('health', 'WhatsApp Image 2026-11-16 at 2.41.25 AM.jpeg'), out('hero-1.webp'), {
  left: 0,
  top: 0,
  width: 1600,
  height: 900,
})
await heroPhoto(src('health', 'WhatsApp Image 2026-11-16 at 2.41.26 AM (1).jpeg'), out('hero-2.webp'), {
  left: 0,
  top: 0,
  width: 1600,
  height: 900,
})
await heroPhoto(src('website', 'IMG-20260411-WA0037.jpg'), out('hero-3.webp'), {
  left: 0,
  top: 33,
  width: 1600,
  height: 1000,
})
await heroPhoto(src('n8n', 'WhatsApp Image 2026-11-16 at 2.47.32 AM (4).jpeg'), out('hero-4.webp'), {
  left: 0,
  top: 168,
  width: 1080,
  height: 675,
})
await heroPhoto(src('bmce', 'WhatsApp Image 2026-11-11 at 7.11.01 PM (2).jpeg'), out('hero-5.webp'), {
  left: 0,
  top: 30,
  width: 1280,
  height: 800,
})

// About gallery.
await cropResize(src('integration', 'WhatsApp Image 2026-11-16 at 2.49.25 AM (2).jpeg'), out('about-team.webp'), {
  left: 0,
  top: 130,
  width: 1066,
  height: 1332,
  resizeWidth: 800,
})
await cropResize(src('integration', 'WhatsApp Image 2026-11-16 at 2.49.25 AM (5).jpeg'), out('about-stage.webp'), {
  left: 0,
  top: 60,
  width: 1066,
  height: 1332,
  resizeWidth: 800,
})
await cropResize(src('bmce', 'WhatsApp Image 2026-11-11 at 7.10.56 PM.jpeg'), out('about-partners.webp'), {
  left: 256,
  top: 0,
  width: 768,
  height: 960,
  resizeWidth: 800,
})

// Wide photo used beside the club story on the home page.
await cropResize(src('health', 'WhatsApp Image 2026-11-16 at 2.41.25 AM.jpeg'), out('home-about.webp'), {
  left: 125,
  top: 0,
  width: 1350,
  height: 900,
  resizeWidth: 1000,
})

// Event cards (16:10).
await cropResize(src('health', 'WhatsApp Image 2026-11-16 at 2.41.26 AM (1).jpeg'), out('event-health.webp'), {
  left: 80,
  top: 0,
  width: 1440,
  height: 900,
  resizeWidth: 1000,
})
await cropResize(src('website', 'IMG-20260411-WA0037.jpg'), out('event-website.webp'), {
  left: 0,
  top: 40,
  width: 1600,
  height: 1000,
  resizeWidth: 1000,
})
await cropResize(src('n8n', 'WhatsApp Image 2026-11-16 at 2.47.32 AM (1).jpeg'), out('event-n8n.webp'), {
  left: 0,
  top: 40,
  width: 1080,
  height: 675,
  resizeWidth: 1000,
})
await cropResize(src('computing', 'WhatsApp Image 2026-11-16 at 2.44.48 AM.jpeg'), out('event-computer-day.webp'), {
  left: 140,
  top: 50,
  width: 1120,
  height: 700,
  resizeWidth: 1000,
})
await cropResize(src('bmce', 'WhatsApp Image 2026-11-11 at 7.10.56 PM.jpeg'), out('event-partners.webp'), {
  left: 0,
  top: 30,
  width: 1280,
  height: 800,
  resizeWidth: 1000,
})

// Gallery — photos that are not already used elsewhere on the site.
await resizePhoto(src('integration', 'WhatsApp Image 2026-11-16 at 2.49.25 AM (3).jpeg'), out('gallery-integration-day.webp'), {
  maxWidth: 900,
  maxHeight: 1200,
})
await resizePhoto(src('health', 'WhatsApp Image 2026-11-16 at 2.41.26 AM.jpeg'), out('gallery-health-group.webp'))
await resizePhoto(src('n8n', 'WhatsApp Image 2026-11-16 at 2.47.32 AM (3).jpeg'), out('gallery-n8n-group.webp'))
await resizePhoto(src('n8n', 'WhatsApp Image 2026-11-16 at 2.47.32 AM (4).jpeg'), out('gallery-n8n-audience.webp'))
await resizePhoto(src('website', 'IMG-20260506-WA0013.jpg'), out('gallery-website-team.webp'))
await resizePhoto(src('website', 'IMG-20260506-WA0010.jpg'), out('gallery-website-talk.webp'))
await resizePhoto(src('computing', 'WhatsApp Image 2026-11-16 at 2.44.47 AM (3).jpeg'), out('gallery-computing-notes.webp'))
await resizePhoto(src('bmce', 'WhatsApp Image 2026-11-11 at 7.11.01 PM (2).jpeg'), out('gallery-bmce-banner.webp'))
await resizePhoto(src('bmce', 'WhatsApp Image 2026-11-11 at 7.10.46 PM (1).jpeg'), out('gallery-bmce-speaker.webp'))

// Board portraits — bust crops used in the numbered gold cards on /board.
await fs.mkdir(path.join(OUT, 'board'), { recursive: true })
for (const [file, name, left, top, width = 660, height = 860] of [
  ['ali elamrani.jpg', 'ali-el-amrani.webp', 613, 210],
  ['issam.jpg', 'issam-brahmi.webp', 70, 90],
  // Anas: studio cut-out on black. A tighter source box keeps the head from
  // drowning in the background, then it is scaled to the same 660x860 card crop.
  ['anas.jpg', 'anas-errafiq.webp', 630, 298, 600, 782],
  ['chaima.jpg', 'chaima-labsiri.webp', 1020, 150],
  ['nezha.jpg', 'nezha-azizi.webp', 980, 100],
  ['adnan.jpg', 'adnan-el-idrissi.webp', 120, 12],
]) {
  await cropResize(src('board', file), out(`board/${name}`), {
    left,
    top,
    width,
    height,
    resizeWidth: 660,
    quality: 84,
  })
}

const emblem = await makeEmblem()
await makeFavicons(emblem)
await makePoster(emblem)

console.log(`\nDone. Assets read from ${ASSETS}`)
