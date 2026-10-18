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

// Guards the per-request locale: with a global locale.set in the hook, any real async work in a
// load function (simulated with a 10ms delay) rendered half of these pages in the wrong language.
test('concurrent requests are each rendered in their own language', async ({ request }) => {
	const titles = { de: '<title>Notenhelferlein', en: '<title>Note Helper' };
	const langs = Array.from({ length: 40 }, (_, i) => (i % 2 ? 'en' : 'de') as 'de' | 'en');
	const pages = await Promise.all(
		langs.map((lang) =>
			request
				.get('/instrument/trombone', { headers: { 'accept-language': lang } })
				.then((r) => r.text())
		)
	);
	const wrong = pages.filter((html, i) => !html.includes(titles[langs[i]]));
	expect(wrong.length).toBe(0);
});
