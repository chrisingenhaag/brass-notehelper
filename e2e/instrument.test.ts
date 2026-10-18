import { expect, test } from '@playwright/test';

test('home page links to instrument pages without clef in url', async ({ page }) => {
	await page.goto('/');
	await page.locator('.instrument-links a').first().click();
	await expect(page).toHaveURL('/instrument/trombone');
	await expect(page.locator('svg ellipse')).toBeVisible();
});

test('old url with clef redirects to instrument page', async ({ page }) => {
	await page.goto('/instrument/trumpetc/treble');
	await expect(page).toHaveURL('/instrument/trumpetc');
});

test('unknown instrument returns 404', async ({ page }) => {
	const response = await page.goto('/instrument/kazoo');
	expect(response?.status()).toBe(404);
});
