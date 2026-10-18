import {
	hornCombinations,
	NoteBasesInBassClef,
	NoteBasesInTrebleClef,
	tromboneCombinations,
	trumpetCombinations,
	tubaCombinations
} from './instrumentPositions';

export type Note =
	| 'Cis'
	| 'C'
	| 'Dis'
	| 'D'
	| 'Des'
	| 'Es'
	| 'E'
	| 'Eis'
	| 'Fes'
	| 'F'
	| 'Fis'
	| 'Ges'
	| 'G'
	| 'Gis'
	| 'As'
	| 'A'
	| 'Ais'
	| 'B'
	| 'H'
	| 'His'
	| 'ces'
	| 'c'
	| 'cis'
	| 'des'
	| 'd'
	| 'dis'
	| 'es'
	| 'e'
	| 'eis'
	| 'fes'
	| 'f'
	| 'fis'
	| 'ges'
	| 'g'
	| 'gis'
	| 'as'
	| 'a'
	| 'ais'
	| 'b'
	| 'h'
	| 'his'
	| "ces'"
	| "c'"
	| "cis'"
	| "des'"
	| "d'"
	| "dis'"
	| "es'"
	| "e'"
	| "eis'"
	| "fes'"
	| "f'"
	| "fis'"
	| "ges'"
	| "g'"
	| "gis'"
	| "as'"
	| "a'"
	| "ais'"
	| "b'"
	| "h'"
	| "his'"
	| "ces''"
	| "c''"
	| "cis''"
	| "des''"
	| "d''"
	| "dis''"
	| "es''"
	| "e''"
	| "eis''"
	| "fes''"
	| "f''"
	| "fis''"
	| "ges''"
	| "g''"
	| "gis''"
	| "as''"
	| "a''"
	| "ais''"
	| "b''"
	| "h''"
	| "his''"
	| "ces'''"
	| "c'''"
	| "cis'''"
	| "des'''"
	| "d'''"
	| "dis'''";

export type Position = number | string;

export type Accidental = '♭' | '♯';

export enum ScoreSystem {
	Bass = 'bass',
	Treble = 'treble'
}

export interface NoteInfo {
	staffPosition: number;
	accidental?: Accidental;
}

export interface Combination {
	note: Note;
	positions: Position[];
}

export enum Instrument {
	Trombone = 'trombone',
	Horn = 'horn',
	Tuba = 'tuba',
	Trumpetc = 'trumpetc'
}

export interface InstrumentConfig {
	system: ScoreSystem;
	startNote: Note;
	combinations: Combination[];
}

export const instrumentConfig: Record<Instrument, InstrumentConfig> = {
	[Instrument.Trombone]: {
		system: ScoreSystem.Bass,
		startNote: 'B',
		combinations: tromboneCombinations
	},
	[Instrument.Horn]: { system: ScoreSystem.Bass, startNote: 'B', combinations: hornCombinations },
	[Instrument.Tuba]: { system: ScoreSystem.Bass, startNote: 'B', combinations: tubaCombinations },
	[Instrument.Trumpetc]: {
		system: ScoreSystem.Treble,
		startNote: "g'",
		combinations: trumpetCombinations
	}
};

export function getNextNote(instrument: Instrument, note: Note): Note {
	const index = instrumentConfig[instrument].combinations.findIndex(
		(combination) => combination.note === note
	);
	if (index === -1 || index === instrumentConfig[instrument].combinations.length - 1) {
		return note;
	}
	return instrumentConfig[instrument].combinations[index + 1].note;
}

export function getPreviousNote(instrument: Instrument, note: Note): Note {
	const index = instrumentConfig[instrument].combinations.findIndex(
		(combination) => combination.note === note
	);
	if (index === -1 || index === 0) {
		return note;
	}
	return instrumentConfig[instrument].combinations[index - 1].note;
}

export function getInstrumentPosition(instrument: Instrument, note: Note): Position[] {
	const positions = instrumentConfig[instrument].combinations.find(
		(combination) => combination.note === note
	)?.positions;
	if (!positions) {
		throw new Error(`No position found for note: ${note}`);
	}
	return positions;
}

export function getStaffPosition(note: Note, system: ScoreSystem): number {
	if (system === ScoreSystem.Bass) {
		return NoteBasesInBassClef.get(note)?.staffPosition ?? 0;
	} else if (system === ScoreSystem.Treble) {
		return NoteBasesInTrebleClef.get(note)?.staffPosition ?? 0;
	}
	throw new Error(`Unsupported score system: ${system}`);
}

export function isValidNote(instrument: Instrument, note: string): note is Note {
	return instrumentConfig[instrument].combinations.some((combination) => combination.note === note);
}
