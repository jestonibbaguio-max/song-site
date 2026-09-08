import { test, expect } from '@playwright/test';

test('Production login flow: Skip SSO and go to dashboard', async ({ page }) => {
  await page.goto('https://jestonibbaguio-max.github.io/song-site/dashboard');

  await expect(page).toHaveTitle(/ATCP Song/i);

  const skipButton = page.getByRole('button', { name: /skip sso/i });
  await expect(skipButton).toBeVisible();
  await skipButton.click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: /welcome|song/i })).toBeVisible();
});
