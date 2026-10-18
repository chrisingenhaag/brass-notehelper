import { describe, expect, test } from 'vitest';
import { NoteBasesInBassClef, NoteBasesInTrebleClef } from './instrumentPositions';
import {
	getCombinationsForInstrument,
	getInstrumentPosition,
	getNextNote,
	getPreviousNote,
	getStaffPosition,
	getStartNoteForInstrument,
	Instrument,
	instrumentStaffSystemMap,
	isValidNote,
	ScoreSystem,
	type Note
} from './positionBase';

describe.each(Object.values(Instrument))('%s', (instrument) => {
	const system = instrumentStaffSystemMap[instrument];
	const notes = getCombinationsForInstrument(instrument).map((c) => c.note);

	test('combinations go from low to high, so "next" is always up', () => {
		const staffPositions = notes.map((note) => getStaffPosition(note, system));
		// lower staffPosition = higher on the staff
		const descendingOnStaff = staffPositions.some((p, i) => i > 0 && p > staffPositions[i - 1]);
		expect(descendingOnStaff).toBe(false);
	});

	test('every note exists in the clef map, so it is not drawn at the fallback position', () => {
		const clefMap = system === ScoreSystem.Bass ? NoteBasesInBassClef : NoteBasesInTrebleClef;
		expect(notes.filter((note) => !clefMap.has(note))).toEqual([]);
	});

	test('start note belongs to the instrument', () => {
		expect(isValidNote(instrument, getStartNoteForInstrument(instrument))).toBe(true);
	});

	test('next/previous move one step and stop at the range ends', () => {
		expect(getNextNote(instrument, notes[0])).toBe(notes[1]);
		expect(getPreviousNote(instrument, notes[1])).toBe(notes[0]);
		expect(getPreviousNote(instrument, notes[0])).toBe(notes[0]);
		expect(getNextNote(instrument, notes.at(-1)!)).toBe(notes.at(-1));
	});
});

test('unknown note: navigation keeps it, position lookup throws', () => {
	const outOfRange: Note = "d'''"; // treble only, not playable on trombone here
	expect(getNextNote(Instrument.Trombone, outOfRange)).toBe(outOfRange);
	expect(getPreviousNote(Instrument.Trombone, outOfRange)).toBe(outOfRange);
	expect(() => getInstrumentPosition(Instrument.Trombone, outOfRange)).toThrow();
});
