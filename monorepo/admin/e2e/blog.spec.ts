import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@petfolioo.com';
const ADMIN_PASSWORD = 'P@tF0lioo@2612210106022312';

async function login(page: any) {
  await page.goto('/login');
  await page.getByPlaceholder('admin@petfolioo.com').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20000 });
}

test.describe('Blog CMS', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('blog page loads from sidebar', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog Posts' })).toBeVisible();
    await expect(page.getByRole('button', { name: /New Post/ })).toBeVisible();
    await expect(page.getByPlaceholder('Search posts...')).toBeVisible();
  });

  test('new post drawer opens with all fields', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('button', { name: /New Post/ }).click();
    await expect(page.getByRole('dialog', { name: 'New Post' })).toBeVisible();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Slug')).toBeVisible();
    await expect(page.getByLabel('Content')).toBeVisible();
    await expect(page.getByLabel('Excerpt')).toBeVisible();
    await expect(page.getByText('Cover Image')).toBeVisible();
    await expect(page.getByRole('button', { name: /Upload Image/ })).toBeVisible();
    await expect(page.getByLabel('Tags')).toBeVisible();
    await expect(page.getByLabel('Meta Title')).toBeVisible();
    await expect(page.getByLabel('Meta Description')).toBeVisible();
    await expect(page.getByLabel('Published')).toBeVisible();
    await expect(page.getByLabel('Featured')).toBeVisible();
  });

  test('new post drawer can be closed', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('button', { name: /New Post/ }).click();
    await expect(page.getByRole('dialog', { name: 'New Post' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('dialog', { name: 'New Post' })).not.toBeVisible();
  });

  test('create post validates required fields', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('button', { name: /New Post/ }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Title is required')).toBeVisible();
  });

  test('blog table shows columns', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Author' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Views' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });

  test('sidebar shows Blog menu item', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('menuitem', { name: /Blog/ })).toBeVisible();
  });
});
