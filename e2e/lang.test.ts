import { expect, test } from '@playwright/test';

for (const [acceptLanguage, lang] of [
	['en-US,en;q=0.9', 'en'],
	['de-DE', 'de'],
	['fr-FR', 'de']
]) {
	test(`html lang is ${lang} for Accept-Language ${acceptLanguage}`, async ({ request }) => {
		const html = await (
			await request.get('/', { headers: { 'accept-language': acceptLanguage } })
		).text();
		expect(html).toContain(`<html lang="${lang}">`);
	});
}

test.describe('english browser', () => {
	test.use({ locale: 'en-US' });

	test('meta tags and about page are english', async ({ page }) => {
		await page.goto('/about');
		await expect(page.locator('h1')).toHaveText('About Note Helper');
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
			'content',
			'Note Helper - Interactive Note Guide for brass instruments'
		);
	});
});

test.describe('note names', () => {
	test.use({ locale: 'en-US' });

	test('english browser sees english note names', async ({ page }) => {
		await page.goto('/instrument/trombone');
		await expect(page.locator('.note-value')).toContainText('B♭2');
	});
});

test.describe('german note names', () => {
	test.use({ locale: 'de-DE' });

	test('german browser keeps german note names', async ({ page }) => {
		await page.goto('/instrument/trombone');
		await expect(page.locator('.note-value')).toHaveText(/^\s*B\s*\(1\)\s*$/);
	});
});
