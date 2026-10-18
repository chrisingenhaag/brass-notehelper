import { describe, expect, test } from 'vitest';
import {
	getCombinationsForInstrument,
	getStaffPosition,
	Instrument,
	instrumentStaffSystemMap
} from './positionBase';

describe.each(Object.values(Instrument))('%s', (instrument) => {
	test('combinations go from low to high, so "next" is always up', () => {
		const system = instrumentStaffSystemMap[instrument];
		const staffPositions = getCombinationsForInstrument(instrument).map((c) =>
			getStaffPosition(c.note, system)
		);
		// lower staffPosition = higher on the staff
		const descendingOnStaff = staffPositions.some((p, i) => i > 0 && p > staffPositions[i - 1]);
		expect(descendingOnStaff).toBe(false);
	});
});
