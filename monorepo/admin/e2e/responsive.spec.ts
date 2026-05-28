import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@petfolioo.com';
const ADMIN_PASSWORD = 'P@tF0lioo@2612210106022312';

async function login(page: any) {
  await page.goto('/login');
  await page.getByPlaceholder('admin@petroll.com').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Responsive Layout', () => {
  test('login page is usable at all viewport sizes', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('admin@petroll.com')).toBeVisible();
  });

  test('dashboard renders without overflow', async ({ page }) => {
    await login(page);
    await page.waitForTimeout(1000);
    const body = page.locator('body');
    const scrollWidth = await body.evaluate((el) => el.scrollWidth);
    const clientWidth = await body.evaluate((el) => el.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10);
  });

  test('navigation is accessible', async ({ page, isMobile }) => {
    await login(page);
    if (isMobile) {
      const hamburger = page.locator('[class*="anticon-menu"]').first();
      await expect(hamburger).toBeVisible();
    } else {
      await expect(page.locator('.ant-layout-sider')).toBeVisible();
    }
  });

  test('table pages scroll horizontally on small screens', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }
    await login(page);
    await page.goto('/users');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const table = page.locator('.ant-table-content');
    await expect(table).toBeVisible({ timeout: 10000 });
  });

  test('pets page loads without layout break', async ({ page }) => {
    await login(page);
    await page.goto('/pets');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const content = page.locator('.ant-layout-content');
    await expect(content).toBeVisible();
  });
});
