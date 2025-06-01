import { hornCombinations, NoteBases, tromboneCombinations, tubaCombinations } from "./instrumentPositions";

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
    "b'";
export type Position = number | string

export type Accidental = '♭' | '♯';

export interface NoteInfo {
    staffPosition: number;
    accidental?: '♭' | '♯';
}

export interface Combination {
    note: Note;
    positions: Position[];
}

export enum Instrument {
    trombone = 'trombone',
    horn = 'horn',
    // Add other instruments here as needed
}

function getCombinationsForInstrument(instrument: Instrument): Combination[] {
    if (instrument === 'trombone') {
        return tromboneCombinations
    } else if (instrument === 'horn') {
        return hornCombinations
    } else if (instrument === 'tuba') {
        return tubaCombinations
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
        throw new Error(`No trombone position found for note: ${note}`);
    }
    return positions;
}

export function getStaffPosition(note: Note): number {
    const staffPosition = NoteBases.get(note)?.staffPosition;
    if (staffPosition === undefined) {
        throw new Error(`No staff position found for note: ${note}`);
    }
    return staffPosition;
}

export function isValidNote(instrument: Instrument, note: string): note is Note {
    return getCombinationsForInstrument(instrument).some(combination => combination.note === note);
}

export function getNoteFromString(instrument: Instrument, note: string): Combination | null {
    const foundCombination = getCombinationsForInstrument(instrument).find(combination => combination.note === note);
    return foundCombination ? foundCombination : null;
}