import { test, expect } from '@playwright/test'

test('Test de búsqueda de empleos', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const jobCards = page.locator('.cmp-job-card')

  const firstJob = jobCards.first()
  await expect(firstJob).toBeVisible()

  const firstJobTitle = firstJob.locator('h3')
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')
})

test('Test de flujo completo de aplicación', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('JavaScript')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const jobCards = page.locator('.cmp-job-card')

  const firstJob = jobCards.first()
  await expect(firstJob).toBeVisible()

  const firstJobTitle = firstJob.locator('h3')
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

  await firstJob.click()

  await expect(page).toHaveURL(/\/jobs\/.+/)

  const firstSection = page.locator('.cmp-section').first()
  await expect(firstSection.locator('h3')).toHaveText('Descripción del puesto')
  await expect(firstSection.locator('div')).not.toBeEmpty()

  await page.getByRole('link', { name: 'Iniciar sesión' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await expect(applyButton).toBeVisible()

  await applyButton.click()

  const appliedButton = page.getByRole('button', { name: 'Aplicado' }).first()
  await expect(appliedButton).toBeVisible()
})

test('Test de filtros', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const TYPE = 'remoto'
  const LEVEL = 'senior'

  await page.getByTestId('type-filter').selectOption(TYPE)
  await page.getByTestId('level-filter').selectOption(LEVEL)

  const articles = page.locator('.jobs-listings article')
  const count = await articles.count()

  for (let i = 0; i < count; i++) {
    const article = articles.nth(i)

    await expect(article).toHaveAttribute('data-type', TYPE)
    await expect(article).toHaveAttribute('data-level', LEVEL)
  }
})

test('Test de paginación', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const pagination = page.locator('.cmp-pagination')
  await expect(pagination).toBeVisible()

  const nextButton = pagination.getByRole('link', { name: 'Página siguiente' })
  await expect(nextButton).toBeVisible()

  await nextButton.click()

  await expect(page).toHaveURL(/page=2/)
})

test('Test de detalle de empleo', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const jobCards = page.locator('.cmp-job-card')

  const firstJob = jobCards.first()
  await expect(firstJob).toBeVisible()

  await firstJob.click()

  await expect(page).toHaveURL(/\/jobs\/.+/)

  const firstSection = page.locator('.cmp-section').first()
  await expect(firstSection.locator('h3')).toHaveText('Descripción del puesto')
  await expect(firstSection.locator('div')).not.toBeEmpty()

  await page.getByRole('link', { name: 'Iniciar sesión' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await expect(applyButton).toBeVisible()

  await applyButton.click()

  const appliedButton = page.getByRole('button', { name: 'Aplicado' }).first()
  await expect(appliedButton).toBeVisible()
})
