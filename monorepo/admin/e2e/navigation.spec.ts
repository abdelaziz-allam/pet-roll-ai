import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@petfolioo.com';
const ADMIN_PASSWORD = 'P@tF0lioo@2612210106022312';
const API_URL = 'http://localhost:5001/api/v1';

test.describe('Admin Portal Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('admin@petfolioo.com').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });

  test('users page loads', async ({ page }) => {
    await page.goto('/users');
    await expect(page).not.toHaveURL(/\/login/);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Internal Server Error');
  });

  test('pets page loads', async ({ page }) => {
    await page.goto('/pets');
    await expect(page).not.toHaveURL(/\/login/);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Internal Server Error');
  });

  test('API health endpoint is reachable', async ({ request }) => {
    const resp = await request.get(`${API_URL.replace('/api/v1', '')}/health`);
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.status).toBe('ok');
  });

  test('admin-auth permissions-config endpoint works', async ({ request }) => {
    const resp = await request.get(`${API_URL}/admin-auth/permissions-config`);
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.pages).toBeDefined();
    expect(body.pages).toContain('dashboard');
  });

  test('admin login API returns token', async ({ request }) => {
    const resp = await request.post(`${API_URL}/admin-auth/login`, {
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
    expect(body.user.role).toBe('super_admin');
  });
});
