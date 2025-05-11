export type Note = 
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
    "as'" | "a'" | "ais'";
type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Combination {
    note: Note;
    positions: Position[];
    staffPosition: number;
}

const combinations: Combination[] = [
    { note: 'E', positions: [7], staffPosition: 4 },
    { note: 'Eis', positions: [6], staffPosition: 4 },

    { note: 'Fes', positions: [7], staffPosition: 3 },
    { note: 'F', positions: [6], staffPosition: 3 },
    { note: 'Fis', positions: [5], staffPosition: 3 },

    { note: 'Ges', positions: [5], staffPosition: 2 },
    { note: 'G', positions: [4], staffPosition: 2 },
    { note: 'Gis', positions: [3], staffPosition: 2 },

    { note: 'As ', positions: [3], staffPosition: 1 },
    { note: 'A', positions: [2], staffPosition: 1 },
    { note: 'Ais', positions: [1], staffPosition: 1 },
    
    { note: 'B', positions: [1], staffPosition: 0 },
    { note: 'H', positions: [7], staffPosition: 0 },
    { note: 'His', positions: [6], staffPosition: 0 },

    { note: 'ces', positions: [7], staffPosition: -1 },
    { note: 'c', positions: [6], staffPosition: -1 },
    { note: 'cis', positions: [5], staffPosition: -1 },

    { note: 'des', positions: [5], staffPosition: -2 },
    { note: 'd', positions: [4], staffPosition: -2 },
    { note: 'dis', positions: [3], staffPosition: -2 },
    
    { note: 'es', positions: [3], staffPosition: -3 },
    { note: 'e', positions: [2], staffPosition: -3 },
    { note: 'eis', positions: [1], staffPosition: -3 },
    
    { note: 'fes', positions: [2], staffPosition: -4 },
    { note: 'f', positions: [1], staffPosition: -4 },
    { note: 'fis', positions: [5], staffPosition: -4 },
    
    { note: 'ges', positions: [5], staffPosition: -5 },
    { note: 'g', positions: [4], staffPosition: -5 },
    { note: 'gis', positions: [3], staffPosition: -5 },
    
    { note: 'as', positions: [3], staffPosition: -6 },
    { note: 'a', positions: [2], staffPosition: -6 },
    { note: 'ais', positions: [1], staffPosition: -6 },
    
    { note: 'b', positions: [1], staffPosition: -7 },
    { note: 'h', positions: [4], staffPosition: -7 },
    { note: 'his', positions: [3], staffPosition: -7 },

    { note: "ces'", positions: [4], staffPosition: -8 },
    { note: "c'", positions: [3], staffPosition: -8 },
    { note: "cis'", positions: [2], staffPosition: -8 },
    
    { note: "des'", positions: [2], staffPosition: -9 },
    { note: "d'", positions: [1, 4], staffPosition: -9 },
    { note: "dis'", positions: [3], staffPosition: -9 },
    
    { note: "es'", positions: [3], staffPosition: -10 },
    { note: "e'", positions: [2], staffPosition: -10 },
    { note: "eis'", positions: [1], staffPosition: -10 },
    
    { note: "fes'", positions: [2], staffPosition: -11 },
    { note: "f'", positions: [1], staffPosition: -11 },
    { note: "fis'", positions :[3], staffPosition : -11},
    
    { note : "ges'", positions :[3], staffPosition : -12},
    { note : "g'", positions :[2, 4], staffPosition : -12},
    { note : "gis'", positions :[1,3], staffPosition : -12},
    
    { note : "as'", positions :[1,3], staffPosition : -13},
    { note : "a'", positions :[2], staffPosition : -13},
    { note : "ais'", positions :[1], staffPosition : -13}
];

export function getNextNote(note: Note): Note {
    const index = combinations.findIndex(combination => combination.note === note);
    if (index === -1 || index === combinations.length - 1) {
        return note;
    }
    return combinations[index + 1].note;
}

export function getPreviousNote(note: Note): Note {
    const index = combinations.findIndex(combination => combination.note === note);
    if (index === -1 || index === 0) {
        return note;
    }
    return combinations[index - 1].note;
}

export function getTrombonePosition(note: Note): Position[] {
    const positions = combinations.find(combination => combination.note === note)?.positions;
    if (!positions) {
        throw new Error(`No trombone position found for note: ${note}`);
    }
    return positions;
}

export function getStaffPosition(note: Note): number {
    const staffPosition = combinations.find(combination => combination.note === note)?.staffPosition;
    if (staffPosition === undefined) {
        throw new Error(`No staff position found for note: ${note}`);
    }
    return staffPosition;
}

export function isValidNote(note: string): note is Note {
    return combinations.some(combination => combination.note === note);
}