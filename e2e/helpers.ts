import type { Page } from '@playwright/test';

// Server-rendered markup is visible before Svelte attaches event listeners, so a key press or
// click right after goto() can get lost. +layout.svelte sets data-hydrated once listeners exist.
export async function gotoHydrated(page: Page, url: string) {
	await page.goto(url);
	await page.locator('body[data-hydrated]').waitFor({ state: 'attached' });
}
