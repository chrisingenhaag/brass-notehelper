import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import StaffSystem from './StaffSystem.svelte';
import { tromboneCombinations } from '$lib/instrumentPositions';
import { getCombinationsForInstrument, Instrument, instrumentStaffSystemMap, ScoreSystem } from '$lib/positionBase';

describe('StaffSystem', () => {
  Object.values(Instrument).forEach((instrument) => {
    getCombinationsForInstrument(instrument).forEach((combination) => {
      test(`should render ${combination.note} in for ${instrument} in ${instrumentStaffSystemMap[instrument]}`, () => {
        const { container } = render(StaffSystem, {
          system: ScoreSystem.Bass,
          note: combination.note,
        });

        expect(container.innerHTML).toMatchSnapshot();
      });
    });
  });
});