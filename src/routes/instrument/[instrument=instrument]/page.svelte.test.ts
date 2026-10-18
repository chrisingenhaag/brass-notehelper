import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { addMessages, init } from 'svelte-i18n';
import de from '$lib/i18n/locales/de.json';
import { Instrument } from '$lib/positionBase';

describe('/instrument/[instrument]/+page.svelte', () => {
	// synchronous setup: $lib/i18n loads the browser locale async, which races with the test
	addMessages('de', de);
	init({ fallbackLocale: 'de', initialLocale: 'de' });

	test('shows the selected instrument and its start note with position', () => {
		render(Page, { data: {}, params: { instrument: Instrument.Trombone } });
		expect(
			screen.getByText(
				'Wische oder scrolle über die Note oder nutze die Pfeile, um sie zu verändern.'
			)
		).toBeInTheDocument();
		expect(screen.getByText('Posaune')).toBeInTheDocument();
		expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', 'B 1');
	});
});
