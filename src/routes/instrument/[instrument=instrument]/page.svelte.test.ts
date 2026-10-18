import { describe, test, expect, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import { Instrument } from '$lib/positionBase';

describe('/instrument/[instrument]/+page.svelte', () => {
	beforeAll(async () => {
		locale.set('de');
		await waitLocale();
	});

	test('shows the selected instrument and its start note with position', () => {
		render(Page, { data: {}, params: { instrument: Instrument.Trombone } });
		expect(
			screen.getByText('Wische oder scrolle über die Note, um sie zu verändern.')
		).toBeInTheDocument();
		expect(screen.getByText('Posaune')).toBeInTheDocument();
		expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', 'B 1');
	});
});
