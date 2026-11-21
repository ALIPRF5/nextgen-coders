import { expect, test } from '@playwright/test'
import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'

const JOIN_DB = path.resolve('data/nextgen.sqlite')

function readJoinRow(email) {
  const db = new DatabaseSync(JOIN_DB, { readOnly: true })
  try {
    return db
      .prepare('SELECT * FROM join_requests WHERE email = ? ORDER BY id DESC LIMIT 1')
      .get(email)
  } finally {
    db.close()
  }
}

function deleteJoinRows(email) {
  const db = new DatabaseSync(JOIN_DB)
  try {
    db.prepare('DELETE FROM join_requests WHERE email = ?').run(email)
  } finally {
    db.close()
  }
}

test('empty submit shows every required error', async ({ page }) => {
  await page.goto('/join')
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

  await expect(page.getByText('Ton nom est trop court (2 caractères minimum).')).toBeVisible()
  await expect(page.getByText('Un email valide est nécessaire pour te répondre.')).toBeVisible()
  await expect(page.getByText('Choisis un parcours.', { exact: true })).toBeVisible()
  await expect(page.getByText('Choisis ton niveau.', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Bienvenue à bord.' })).toHaveCount(0)
})

test('invalid email is rejected', async ({ page }) => {
  await page.goto('/join')
  await page.locator('#join-name').fill('Étudiant Test')
  await page.locator('#join-email').fill('pas-un-email')
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

  await expect(page.getByText('Un email valide est nécessaire pour te répondre.')).toBeVisible()
  await expect(page.locator('#join-email')).toHaveAttribute('aria-invalid', 'true')
})

test('valid request is saved and reaches the success state', async ({ page }, testInfo) => {
  const email = `etudiant-${testInfo.project.name}@nextgen.test`
  await page.goto('/join')

  const storage = await page.locator('form').getAttribute('data-storage')
  test.skip(storage !== 'local', 'Supabase is configured; the local SQLite test does not apply')

  deleteJoinRows(email)

  try {
    await expect(page.getByText('Tes informations sont enregistrées')).toBeVisible()

    await page.locator('#join-name').fill('Étudiant Test')
    await page.locator('#join-email').fill(email)
    await page.locator('#join-track-web').check({ force: true })
    await page.locator('#join-level-beginner').check({ force: true })
    await page.locator('#join-message').fill('Je veux construire un projet web.')
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

    const success = page.getByRole('heading', { name: 'Bienvenue à bord.' })
    await expect(success).toBeVisible()
    await expect(success).toBeFocused()
    await expect(page.getByText('Ta demande est bien enregistrée.')).toBeVisible()

    const row = readJoinRow(email)
    expect(row?.name).toBe('Étudiant Test')
    expect(row?.track).toBe('web')
    expect(row?.level).toBe('beginner')
    expect(row?.message).toBe('Je veux construire un projet web.')
    expect(row?.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)

    await page.getByRole('button', { name: 'Envoyer une autre demande' }).click()
    await expect(page.getByRole('heading', { name: 'Ta demande' })).toBeVisible()
    await expect(page.locator('#join-name')).toHaveValue('')
  } finally {
    deleteJoinRows(email)
  }
})

test('message length is capped at 1000 characters', async ({ page }) => {
  await page.goto('/join')
  await page.locator('#join-name').fill('Étudiant Test')
  await page.locator('#join-email').fill('etudiant@example.com')
  await page.locator('#join-track-design').check({ force: true })
  await page.locator('#join-level-advanced').check({ force: true })
  await page.locator('#join-message').fill('a'.repeat(1001))
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

  await expect(page.getByText('1000 caractères maximum.')).toBeVisible()
})
