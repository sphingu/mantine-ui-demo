import { test, expect } from '@playwright/test'

test.describe('validate e2e tests', () => {
  test('check github authentication(e2e)', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.locator('svg > circle').isVisible()
    await expect(
      page.getByRole('heading', { name: 'Welcome to Mantine !' })
    ).toBeVisible()
    await expect(
      page.getByText('Please sign in with bellow options')
    ).toBeVisible()
    await page.getByText('Sign in with GitHub').click()
    await expect(page).toHaveURL(/github.com.*/)

    await page.getByLabel('Username or email address').type('sprotonone')
    await page.getByLabel('Password').type('test') // TODO:
    await page.getByRole('button', { name: 'Sign in' }).click()
    // await page.getByRole('button', { name: 'Authorize sphingu' }).click()

    await expect(page).toHaveURL(/localhost/)
    await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mantine' })).toBeVisible()
    await expect(page.getByText('Welcome sphingu@protonmail.com')).toBeVisible()
    await page.getByRole('link', { name: 'Logout' }).click()

    await expect(
      page.getByText('You have been successfully logged out')
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Welcome to Mantine !' })
    ).toBeVisible()
    await expect(
      page.getByText('Please sign in with bellow options')
    ).toBeVisible()
  })
})

test.describe('validate integration tests', () => {
  test('validate mock authentication with pressing M keyword', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001')
    await expect(
      page.getByRole('heading', { name: 'Welcome to Mantine !' })
    ).toBeVisible()
    await page.keyboard.press('M')

    await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mantine' })).toBeVisible()
    await expect(page.getByText('Welcome test@example.com')).toBeVisible()
    await page.getByRole('link', { name: 'Logout' }).click()
  })

  test('test already authenticated user', async ({ page }) => {
    await page.route('https://*.supabase.co/auth/v1/user', async (route) => {
      const json = {
        id: '0d50ab4a-e8ae-458d-9f9d-8a753c57642d',
        email: 'test@example.com',
        user_metadata: {
          avatar_url: 'https://avatars.githubusercontent.com/u/8?v=4',
          full_name: 'Test User',
          user_name: 'testuser',
        },
      }
      await route.fulfill({ json })
    })
    await page.goto('http://localhost:3001')

    await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mantine' })).toBeVisible()
    await expect(page.getByText('Welcome test@example.com')).toBeVisible()
    await page.getByRole('link', { name: 'Logout' }).click()

    await expect(
      page.getByText('You have been successfully logged out')
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Welcome to Mantine !' })
    ).toBeVisible()
    await expect(
      page.getByText('Please sign in with bellow options')
    ).toBeVisible()
  })
})
