import { hornCombinations, NoteBasesInBassClef, NoteBasesInTrebleClef, tromboneCombinations, trumpetCombinations, tubaCombinations } from "./instrumentPositions";

export type Note = 
    'Cis' | 'C' |
    'Dis' | 'D' | 'Des' |
    'Es' | 'E' | 'Eis' | 
    'Fes' | 'F' | 'Fis' | 
    'Ges' | 'G' | 'Gis' | 
    'As ' | 'A' | 'Ais' | 
    'B' | 'H' | 'His' | 
    'ces' | 'c' | 'cis' | 
    'des' | 'd' | 'dis' |
    'es' | 'e' | 'eis' |
    'fes' | 'f' | 'fis' |
    'ges' | 'g' | 'gis' |
    'as' | 'a' | 'ais' |
    'b' | 'h' | 'his' |
    "ces'" | "c'" | "cis'" |
    "des'" | "d'" | "dis'" |
    "es'" | "e'" | "eis'" |
    "fes'" | "f'" | "fis'" |
    "ges'" | "g'" | "gis'" |
    "as'" | "a'" | "ais'" |
    "b'" | "h'" | "his'" |
    "ces''" | "c''" | "cis''" |
    "des''" | "d''" | "dis''" |
    "es''" | "e''" | "eis''" |
    "fes''" | "f''" | "fis''" |
    "ges''" | "g''" | "gis''" |
    "as''" | "a''" | "ais''" |
    "b''" | "h''" | "his''";

export type Position = number | string

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
    // Add other instruments here as needed
}

// a map linking instruments to their staff system
export const instrumentStaffSystemMap: Record<Instrument, ScoreSystem> = {
    [Instrument.Trombone]: ScoreSystem.Bass,
    [Instrument.Horn]: ScoreSystem.Bass,
    [Instrument.Tuba]: ScoreSystem.Bass,
    [Instrument.Trumpetc]: ScoreSystem.Treble
    // Add other instruments here as needed
};

export function getStartNoteForInstrument(instrument: Instrument): Note {
    if (instrument === Instrument.Trombone) {
        return 'B';
    } else if (instrument === Instrument.Horn) {
        return 'B';
    } else if (instrument === Instrument.Tuba) {
        return 'B';
    } else if (instrument === Instrument.Trumpetc) {
        return "g'"
    }
    throw new Error(`Unsupported instrument: ${instrument}`);
}

export function getCombinationsForInstrument(instrument: Instrument): Combination[] {
    if (instrument === Instrument.Trombone) {
        return tromboneCombinations
    } else if (instrument === Instrument.Horn) {
        return hornCombinations
    } else if (instrument === Instrument.Tuba) {
        return tubaCombinations
    } else if (instrument === Instrument.Trumpetc) {
        return trumpetCombinations
    }
    throw new Error(`Unsupported instrument: ${instrument}`);
}

export function getNextNote(instrument: Instrument, note: Note): Note {
    const index = getCombinationsForInstrument(instrument).findIndex(combination => combination.note === note);
    if (index === -1 || index === getCombinationsForInstrument(instrument).length - 1) {
        return note;
    }
    return getCombinationsForInstrument(instrument)[index + 1].note;
}

export function getPreviousNote(instrument: Instrument, note: Note): Note {
    const index = getCombinationsForInstrument(instrument).findIndex(combination => combination.note === note);
    if (index === -1 || index === 0) {
        return note;
    }
    return getCombinationsForInstrument(instrument)[index - 1].note;
}

export function getInstrumentPosition(instrument: Instrument, note: Note): Position[] {
    const positions = getCombinationsForInstrument(instrument).find(combination => combination.note === note)?.positions;
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
    return getCombinationsForInstrument(instrument).some(combination => combination.note === note);
}

export function getNoteFromString(instrument: Instrument, note: string): Combination | null {
    const foundCombination = getCombinationsForInstrument(instrument).find(combination => combination.note === note);
    return foundCombination ? foundCombination : null;
}