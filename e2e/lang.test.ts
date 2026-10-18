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
