// Builds the Autumn School poster shown on the landing page.
// Source: assets-src/announcement-autumn-school.jpg (the club's original poster).
// Usage: npm run poster
import path from 'node:path'
import sharp from 'sharp'

const INPUT = path.resolve('assets-src/announcement-autumn-school.jpg')
const OUTPUT = path.resolve('public/images/announcement-autumn-school.webp')

const info = await sharp(INPUT)
  // 760 px covers the card at 2x on phones without shipping the full-size file.
  .resize({ width: 760 })
  .webp({ quality: 80, effort: 6 })
  .toFile(OUTPUT)

console.log(
  `poster: ${info.width}x${info.height} · ${Math.round(info.size / 1024)} KB → ${path.relative(process.cwd(), OUTPUT)}`,
)
