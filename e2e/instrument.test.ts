import { expect, test } from '@playwright/test';
import { gotoHydrated } from './helpers';

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

test('staff is an accessible slider that follows arrow keys', async ({ page }) => {
	await gotoHydrated(page, '/instrument/trombone');
	const slider = page.getByRole('slider');
	const start = Number(await slider.getAttribute('aria-valuenow'));
	await page.keyboard.press('ArrowUp');
	await expect(slider).toHaveAttribute('aria-valuenow', String(start + 1));
});

test('arrow buttons change the note and disable at the range ends', async ({ page }) => {
	await gotoHydrated(page, '/instrument/trombone');
	const slider = page.getByRole('slider');
	const up = page.getByRole('button', { name: 'Higher note' });
	const down = page.getByRole('button', { name: 'Lower note' });
	const max = await slider.getAttribute('aria-valuemax');

	const start = Number(await slider.getAttribute('aria-valuenow'));
	await up.click();
	await expect(slider).toHaveAttribute('aria-valuenow', String(start + 1));
	await down.click();
	await expect(slider).toHaveAttribute('aria-valuenow', String(start));

	while (await down.isEnabled()) await down.click();
	await expect(slider).toHaveAttribute('aria-valuenow', '0');
	while (await up.isEnabled()) await up.click();
	await expect(slider).toHaveAttribute('aria-valuenow', max!);
});
