import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import StaffSystem from './StaffSystem.svelte';
import { Instrument, instrumentConfig } from '#lib/positionBase.js';

describe('StaffSystem', () => {
	Object.values(Instrument).forEach((instrument) => {
		instrumentConfig[instrument].combinations.forEach((combination) => {
			test(`should render ${combination.note} in for ${instrument} in ${instrumentConfig[instrument].system}`, () => {
				const { container } = render(StaffSystem, {
					system: instrumentConfig[instrument].system,
					note: combination.note
				});

				expect(container.innerHTML).toMatchSnapshot();
			});
		});
	});
});
