import { test, expect } from '@playwright/test';

test('Admin dashboard shows site overview and read-only maintenance state', async ({ page }) => {
  await page.route('**/api/tasks', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{}, {}, {}]),
  }));
  await page.route('**/api/training-tasks', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{}, {}]),
  }));
  await page.route('**/api/leadership', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      marketLeads: [{}, {}],
      practiceLeads: [{}],
      capabilityLeads: [],
      enablementChampions: [{}],
    }),
  }));

  await page.goto('http://127.0.0.1:4200/admin');

  await expect(page.getByRole('heading', { name: 'Site at a glance' })).toBeVisible();
  await expect(page.getByText('3 signals').first()).toBeVisible();
  await expect(page.locator('.stat-card strong').nth(0)).toHaveText('3');
  await expect(page.locator('.stat-card strong').nth(1)).toHaveText('2');
  await expect(page.locator('.stat-card strong').nth(2)).toHaveText('4');
  await expect(page.getByText('Read-only dashboard preview.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Users & onboarding' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Open workspace' }).first()).toBeDisabled();
});
