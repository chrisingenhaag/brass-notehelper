import { describe, expect, test } from 'vitest';
import { NoteBasesInBassClef, NoteBasesInTrebleClef } from './instrumentPositions';
import {
	getInstrumentPosition,
	getNextNote,
	getPreviousNote,
	getStaffPosition,
	Instrument,
	instrumentConfig,
	isValidNote,
	ScoreSystem,
	toEnglishNoteName,
	type Note
} from './positionBase';

describe.each(Object.values(Instrument))('%s', (instrument) => {
	const { system, startNote, combinations } = instrumentConfig[instrument];
	const notes = combinations.map((c) => c.note);

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
		expect(isValidNote(instrument, startNote)).toBe(true);
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

test.each([
	['B', 'B♭2'],
	['H', 'B2'],
	['His', 'B♯2'],
	['Es', 'E♭2'],
	['As', 'A♭2'],
	['c', 'C3'],
	['fis', 'F♯3'],
	["c'", 'C4'],
	["ces'", 'C♭4'],
	["b'", 'B♭4'],
	["h''", 'B5'],
	["des'''", 'D♭6']
] as [Note, string][])('toEnglishNoteName(%s) = %s', (note, english) => {
	expect(toEnglishNoteName(note)).toBe(english);
});
