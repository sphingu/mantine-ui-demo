import { test, expect } from '@playwright/test'

test('check github authentication', async ({ page }) => {
  await page.goto('http://localhost:3001')
  await page.locator('svg > circle').isVisible()
  await page.getByRole('heading', { name: 'Welcome to Mantine !' }).isVisible()
  await page.getByText('Please sign in with bellow options').isVisible()
  await page.getByText('Sign in with GitHub').click()
  await expect(page).toHaveURL(/github.com.*/)

  await page.getByLabel('Username or email address').type('sprotonone')
  await page.getByLabel('Password').type('test') // TODO:
  await page.getByRole('button', { name: 'Sign in' }).click()
  // await page.getByRole('button', { name: 'Authorize sphingu' }).click()

  await expect(page).toHaveURL(/localhost/)
  await page.getByRole('heading', { name: 'Home Page' })
  await page.getByRole('heading', { name: 'Mantine' })
  await page.getByText('Welcome sphingu@protonmail.com')
  await page.getByRole('link', { name: 'Logout' }).click()

  await page.getByText('You have been successfully logged out')
  await page.getByRole('heading', { name: 'Welcome to Mantine !' }).isVisible()
  await page.getByText('Please sign in with bellow options').isVisible()
})
