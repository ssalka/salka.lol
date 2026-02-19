import { expect, test } from '@playwright/test';

test('Viewing the landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('first-name')).toBeVisible();
});
