import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import StaffSystem from './StaffSystem.svelte';
import { tromboneCombinations } from '$lib/instrumentPositions';
import { ScoreSystem } from '$lib/positionBase';

describe('StaffSystem', () => {
  // all values of the type Note as string array
  tromboneCombinations.forEach((combination) => {
    test(`should render ${combination.note} in bass clef`, () => {
      const { container } = render(StaffSystem, {
        system: ScoreSystem.Bass,
        note: combination.note,
      });

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  
});