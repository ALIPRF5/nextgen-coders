import { expect, test } from '@playwright/test'

const pages = [
  { name: 'home', path: '/', heading: /On n'apprend pas seulement à coder/ },
  { name: 'about', path: '/about', heading: /Un club né pour construire/ },
  { name: 'tracks', path: '/tracks', heading: /Cinq façons d'entrer dans la tech/ },
  { name: 'events', path: '/events', heading: /ateliers, des compétitions, des hackathons/ },
  { name: 'gallery', path: '/gallery', heading: /Le club, en images/ },
  { name: 'board', path: '/board', heading: /Les visages derrière le club/ },
  { name: 'join', path: '/join', heading: /Rejoins NEXTGEN CODERS/ },
  { name: 'contact', path: '/contact', heading: /Parlons code/ },
]

for (const pageInfo of pages) {
  test(`${pageInfo.name} loads cleanly at every size`, async ({ page }, testInfo) => {
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto(pageInfo.path)

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toHaveCount(1)
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText(pageInfo.heading)

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()

    const instagram = page
      .getByRole('contentinfo')
      .getByRole('link', { name: /nextgen_coders_estl/ })
      .first()
    await expect(instagram).toBeVisible()
    await expect(instagram).toHaveAttribute('href', /instagram\.com\/nextgen_coders_estl/)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow, 'no horizontal scroll on this page').toBeLessThanOrEqual(1)

    await page.screenshot({
      path: `test-results/screens/${pageInfo.name}-${testInfo.project.name}.png`,
      fullPage: true,
    })

    expect(errors, 'no console or page errors').toEqual([])
  })
}

test('desktop navbar reaches every page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop navbar only')
  await page.goto('/')

  const nav = page.getByRole('navigation', { name: 'Navigation principale' })
  const links = [
    ['À propos', '/about'],
    ['Parcours', '/tracks'],
    ['Événements', '/events'],
    ['Galerie', '/gallery'],
    ['Bureau', '/board'],
    ['Rejoindre', '/join'],
    ['Contact', '/contact'],
    ['Accueil', '/'],
  ]

  for (const [label, path] of links) {
    await nav.getByRole('link', { name: label }).click()
    await expect(page).toHaveURL(new RegExp(`${path.replace('/', '\\/')}$`))
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})

test('mobile menu opens, navigates and closes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile menu only')
  await page.goto('/')

  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  const menu = page.getByRole('navigation', { name: 'Navigation mobile' })
  await expect(menu).toBeVisible()

  await menu.getByRole('link', { name: 'Parcours' }).click()
  await expect(page).toHaveURL(/\/tracks$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText("Cinq façons d'entrer")
  await expect(menu).toHaveCount(0)
})

test('language toggle switches to English and remembers it', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'English' }).click()

  await expect(page.locator('h1')).toContainText("We don't just learn code")
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')

  await page.reload()
  await expect(page.locator('h1')).toContainText("We don't just learn code")

  await page.getByRole('button', { name: 'Français' }).click()
  await expect(page.locator('h1')).toContainText("On n'apprend pas seulement")
})

test('theme toggle switches to dark mode and remembers it', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'light')
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)

  await page.getByRole('button', { name: 'Activer le mode sombre' }).click()
  await expect(html).toHaveAttribute('data-theme', 'dark')
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(darkBg).not.toBe(lightBg)

  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'dark')

  await page.getByRole('button', { name: 'Activer le mode clair' }).click()
  await expect(html).toHaveAttribute('data-theme', 'light')
})

test('English version fits a phone on every page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only')
  await page.goto('/')
  await page.getByRole('button', { name: 'English' }).click()

  for (const path of ['/', '/about', '/tracks', '/events', '/gallery', '/board', '/join', '/contact']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow, `no horizontal scroll on ${path} (EN)`).toBeLessThanOrEqual(1)
  }
})

test('gallery filters keep only the chosen category', async ({ page }) => {
  await page.goto('/gallery')

  const figures = page.locator('section figure')
  await expect(figures.first()).toBeVisible()
  const total = await figures.count()
  expect(total).toBeGreaterThan(0)

  await page.getByRole('button', { name: 'Ateliers' }).click()
  await expect.poll(async () => figures.count()).toBeLessThan(total)
  const filtered = await figures.count()
  expect(filtered).toBeGreaterThan(0)
  await expect(figures.first()).toBeVisible()

  await page.getByRole('button', { name: 'Tout' }).click()
  await expect(figures).toHaveCount(total)
})

test('board page names the confirmed president', async ({ page }) => {
  await page.goto('/board')
  await expect(page.getByRole('heading', { name: 'Ali El Amrani', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Écrire au président' })).toHaveAttribute(
    'href',
    /mailto:/,
  )

  for (const name of [
    'Issam Brahmi',
    'Anas Errafiq',
    'Chaima Labsiri',
    'Nezha Azizi',
    'Adnan El Idrissi',
  ]) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
  }

  await expect(page.getByText('Adam Elmallaly')).toHaveCount(0)
})

test('unknown URL shows the 404 page with a way home', async ({ page }) => {
  await page.goto('/page-qui-nexiste-pas')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    "Cette page n'existe pas.",
  )
  await page.getByRole('link', { name: "Retour à l'accueil" }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText("On n'apprend pas")
})
