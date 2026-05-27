import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@petfolioo.com';
const ADMIN_PASSWORD = 'P@tF0lioo@2612210106022312';

test.describe('Admin Portal Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('PET Folioo Admin')).toBeVisible();
    await expect(page.getByPlaceholder('admin@petfolioo.com')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('shows error on wrong credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petfolioo.com').fill('notanadmin@petfolioo.com');
    await page.getByPlaceholder('Password').fill('wrongpassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Should show an error alert (Ant Design Alert component)
    await expect(page.locator('.ant-alert')).toBeVisible({ timeout: 10000 });
  });

  test('redirects unauthenticated user from dashboard to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('redirects unauthenticated user from users page to login', async ({ page }) => {
    await page.goto('/users');
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petfolioo.com').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });

  test('dashboard loads after login', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petfolioo.com').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });
  });
});
