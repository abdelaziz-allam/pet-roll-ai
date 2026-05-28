import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@petfolioo.com';
const ADMIN_PASSWORD = 'P@tF0lioo@2612210106022312';

test.describe('Admin Portal Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'PET Roll' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Admin Portal' })).toBeVisible();
    await expect(page.getByPlaceholder('admin@petroll.com')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('shows error on wrong credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petroll.com').fill('wrong@test.com');
    await page.getByPlaceholder('Password').fill('wrongpassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('.ant-alert')).toBeVisible({ timeout: 10000 });
  });

  test('redirects unauthenticated user from dashboard to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petroll.com').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 20000 });
  });

  test('dashboard renders after login', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petroll.com').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 20000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Internal Server Error');
  });
});
