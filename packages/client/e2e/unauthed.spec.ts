import { expect, test } from '@playwright/test';

test('Viewing a protected page redirects to login', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Steven' })).toBeVisible();
});
