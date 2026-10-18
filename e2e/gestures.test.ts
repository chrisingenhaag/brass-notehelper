import { expect, test, type Locator } from '@playwright/test';
import { gotoHydrated } from './helpers';

async function valueOf(slider: Locator) {
	return Number(await slider.getAttribute('aria-valuenow'));
}

test('mouse wheel steps the note up and down', async ({ page }) => {
	await gotoHydrated(page, '/instrument/trombone');
	const slider = page.getByRole('slider');
	const start = await valueOf(slider);

	await slider.hover();
	await page.mouse.wheel(0, -100);
	await expect(slider).toHaveAttribute('aria-valuenow', String(start + 1));
	await page.mouse.wheel(0, 100);
	await expect(slider).toHaveAttribute('aria-valuenow', String(start));
});

test.describe('touch', () => {
	test.use({ hasTouch: true });

	// Playwright has no touch-move API, so dispatch the events the page listens to
	async function swipe(slider: Locator, fromY: number, toY: number) {
		await slider.evaluate(
			(el, [fromY, toY]) => {
				const touch = (clientY: number) => new Touch({ identifier: 1, target: el, clientY });
				el.dispatchEvent(new TouchEvent('touchstart', { touches: [touch(fromY)], bubbles: true }));
				el.dispatchEvent(new TouchEvent('touchmove', { touches: [touch(toY)], bubbles: true }));
			},
			[fromY, toY]
		);
	}

	test('swipe steps the note up and down', async ({ page }) => {
		await gotoHydrated(page, '/instrument/trombone');
		const slider = page.getByRole('slider');
		const start = await valueOf(slider);

		await swipe(slider, 300, 260);
		await expect(slider).toHaveAttribute('aria-valuenow', String(start + 1));
		await swipe(slider, 260, 300);
		await expect(slider).toHaveAttribute('aria-valuenow', String(start));
	});

	test('small movements below the threshold do nothing', async ({ page }) => {
		await gotoHydrated(page, '/instrument/trombone');
		const slider = page.getByRole('slider');
		const start = await valueOf(slider);

		await swipe(slider, 300, 290);
		await expect(slider).toHaveAttribute('aria-valuenow', String(start));
	});
});
