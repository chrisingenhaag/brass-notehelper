import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { locale } from 'svelte-i18n';
import { Instrument, ScoreSystem } from '$lib/positionBase';

describe('/+page.svelte', () => {
	locale.set('de');


	test('should render h1', () => {
		render(Page, {
			data: {
				instrument: Instrument.Trombone,
				system: ScoreSystem.Bass
			}
		});
		expect(screen.getByText('description')).toBeInTheDocument();
		expect(screen.getByText('instrumentPrefix')).toBeInTheDocument();
		expect(screen.getByText('instruments.trombone')).toBeInTheDocument();
	});
});
