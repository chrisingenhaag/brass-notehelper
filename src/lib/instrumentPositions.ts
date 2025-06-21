import { type Note, type Combination, type NoteInfo } from "./positionBase";

export const NoteBasesInBassClef = new Map<Note, NoteInfo>([
    ['Es', { staffPosition: 4, accidental: '♭' },],
    ['E', { staffPosition: 4 },],
    ['Eis', {  staffPosition: 4, accidental: '♯' },],
    ['Fes', {  staffPosition: 3, accidental: '♭' },],
    ['F', {  staffPosition: 3 },],
    ['Fis', {  staffPosition: 3, accidental: '♯' },],
    ['Ges', {  staffPosition: 2, accidental: '♭' },],
    ['G', {  staffPosition: 2 },],
    ['Gis', {  staffPosition: 2, accidental: '♯' },],
    ['As ', {  staffPosition: 1, accidental: '♭' },],
    ['A', {  staffPosition: 1 },],
    ['Ais', {  staffPosition: 1, accidental: '♯' },],
    ['B', {  staffPosition: 0, accidental: '♭' },],
    ['H', {  staffPosition: 0 },],
    ['His', {  staffPosition: 0, accidental: '♯' },],
    ['ces', {  staffPosition: -1, accidental: '♭' },],
    ['c', {  staffPosition: -1 },],
    ['cis', {  staffPosition: -1, accidental: '♯' },],
    ['des', {  staffPosition: -2, accidental: '♭' },],
    ['d', {  staffPosition: -2 },],
    ['dis', {  staffPosition: -2, accidental: '♯' },],
    ['es', {  staffPosition: -3, accidental: '♭' },],
    ['e', {  staffPosition: -3 },],
    ['eis', {  staffPosition: -3, accidental: '♯' },],
    ['fes', {  staffPosition: -4, accidental: '♭' },],
    ['f', {  staffPosition: -4 },],
    ['fis', {  staffPosition: -4, accidental: '♯' },],
    ['ges', {  staffPosition: -5, accidental: '♭' },],
    ['g', {  staffPosition: -5 },],
    ['gis', {  staffPosition: -5, accidental: '♯' },],
    ['as', {  staffPosition: -6, accidental: '♭' },],
    ['a', {  staffPosition: -6 },],
    ['ais', {  staffPosition: -6, accidental: '♯' },],
    ['b', {  staffPosition: -7, accidental: '♭' },],
    ['h', {  staffPosition: -7 },],
    ['his', {  staffPosition: -7, accidental: '♯' },],
    ["ces'", {  staffPosition: -8, accidental: '♭' },],
    ["c'", {  staffPosition: -8 },],
    ["cis'", {  staffPosition: -8, accidental: '♯' },],
    ["des'", {  staffPosition: -9, accidental: '♭' },],
    ["d'", { staffPosition: -9 },],
    ["dis'", { staffPosition: -9, accidental: '♯' },],
    ["es'", { staffPosition: -10, accidental: '♭' },],
    ["e'", { staffPosition: -10 },],
    ["eis'", { staffPosition: -10, accidental: '♯' },],
    ["fes'", { staffPosition: -11, accidental: '♭' },],
    ["f'", {  staffPosition: -11 },],
    ["fis'", { staffPosition : -11, accidental: '♯'},],
    ["ges'", { staffPosition : -12, accidental: '♭'},],
    ["g'", { staffPosition : -12},],
    ["gis'", { staffPosition : -12, accidental: '♯'},],
    ["as'", { staffPosition : -13, accidental: '♭'},],
    ["a'", { staffPosition : -13},],
    ["ais'", { staffPosition : -13, accidental: '♯'},],
    ["b'", { staffPosition : -14, accidental: '♭'}],
]);

export const NoteBasesInTrebleClef = new Map<Note, NoteInfo>([
    ["g'", { staffPosition: 0, accidental: '♭' }],
]);

export const trumpetCombinations: Combination[] = [
    { note: "g'", positions: ['1/2'] },
];


export const tromboneCombinations: Combination[] = [
    { note: 'Es', positions: ['Q3-'] },
    { note: 'E', positions: [7]},
    { note: 'Eis', positions: [6]},

    { note: 'Fes', positions: [7]},
    { note: 'F', positions: [6]},
    { note: 'Fis', positions: [5]},

    { note: 'Ges', positions: [5]},
    { note: 'G', positions: [4]},
    { note: 'Gis', positions: [3]},

    { note: 'As ', positions: [3]},
    { note: 'A', positions: [2]},
    { note: 'Ais', positions: [1]},
    
    { note: 'B', positions: [1]},
    { note: 'H', positions: [7]},
    { note: 'His', positions: [6]},

    { note: 'ces', positions: [7]},
    { note: 'c', positions: [6]},
    { note: 'cis', positions: [5]},

    { note: 'des', positions: [5]},
    { note: 'd', positions: [4]},
    { note: 'dis', positions: [3]},
    
    { note: 'es', positions: [3]},
    { note: 'e', positions: [2]},
    { note: 'eis', positions: [1]},
    
    { note: 'fes', positions: [2]},
    { note: 'f', positions: [1]},
    { note: 'fis', positions: [5],},
    
    { note: 'ges', positions: [5]},
    { note: 'g', positions: [4]},
    { note: 'gis', positions: [3]},
    
    { note: 'as', positions: [3]},
    { note: 'a', positions: [2]},
    { note: 'ais', positions: [1]},
    
    { note: 'b', positions: [1]},
    { note: 'h', positions: [4]},
    { note: 'his', positions: [3]},

    { note: "ces'", positions: [4]},
    { note: "c'", positions: [3]},
    { note: "cis'", positions: [2]},
    
    { note: "des'", positions: [2]},
    { note: "d'", positions: [1, 4]},
    { note: "dis'", positions: [3]},
    
    { note: "es'", positions: [3]},
    { note: "e'", positions: [2]},
    { note: "eis'", positions: [1]},
    
    { note: "fes'", positions: [2]},
    { note: "f'", positions: [1]},
    { note: "fis'", positions :[3]},
    
    { note : "ges'", positions :[3]},
    { note : "g'", positions :[2, 4]},
    { note : "gis'", positions :[1,3]},
    
    { note : "as'", positions :[1,3]},
    { note : "a'", positions :[2]},
    { note : "ais'", positions :[1]},

    { note : "b'", positions :[1]}
];

export const hornCombinations: Combination[] = [
    { note: 'E', positions: ['1/2/3']},
    { note: 'Eis', positions: ['1/2/3']},

    { note: 'Fes', positions: ['1/2/3']},
    { note: 'F', positions: ['1/3']},
    { note: 'Fis', positions: ['2/3']},

    { note: 'Ges', positions: ['2/3']},
    { note: 'G', positions: ['1/2', 3]},
    { note: 'Gis', positions: [1]},

    { note: 'As ', positions: [1]},
    { note: 'A', positions: [2]},
    { note: 'Ais', positions: [0]},
    
    { note: 'B', positions: [0]},
    { note: 'H', positions: ['1/2/3']},
    { note: 'His', positions: ['1/2/3']},

    { note: 'ces', positions: ['1/2/3']},
    { note: 'c', positions: ['1/3']},
    { note: 'cis', positions: ['2/3']},

    { note: 'des', positions: ['2/3']},
    { note: 'd', positions: ['1/2', 3]},
    { note: 'dis', positions: [1]},
    
    { note: 'es', positions: [1]},
    { note: 'e', positions: [2, '1/2/3']},
    { note: 'eis', positions: [2, '1/2/3'],},
    
    { note: 'fes', positions: [2, '1/2/3']},
    { note: 'f', positions: [0]},
    { note: 'fis', positions: ['2/3']},
    
    { note: 'ges', positions: ['2/3']},
    { note: 'g', positions: ['1/2', 3]},
    { note: 'gis', positions: [1, '1/2/3']},
    
    { note: 'as', positions: [1, '1/2/3']},
    { note: 'a', positions: [2, '1/3']},
    { note: 'ais', positions: [0, '2/3']},
    
    { note: 'b', positions: [0, '2/3']},
    { note: 'h', positions: ['1/2', 3]},
    { note: 'his', positions: ['1/2']},

    { note: "ces'", positions: ['1/2']},
    { note: "c'", positions: [1, '1/3']},
    { note: "cis'", positions: [2, '2/3']},
    
    { note: "des'", positions: [2, '2/3']},
    { note: "d'", positions: ['1/2', 0]},
    { note: "dis'", positions: [1]},
    
    { note: "es'", positions: [1]},
    { note: "e'", positions: [2, '1/2/3']},
    { note: "eis'", positions: [2, '1/2/3']},
    
    { note: "fes'", positions: [2, '1/2/3']},
    { note: "f'", positions: [0, '1/3']},
    { note: "fis'", positions :['2/3']},
    
    { note : "ges'", positions :['2/3']},
    { note : "g'", positions :['1/2', 3]},
    { note : "gis'", positions :[1]},
    
    { note : "as'", positions :[1]},
    { note : "a'", positions :[2]},
    { note : "ais'", positions :[0]},

    { note : "b'", positions :[0]}
];

export const tubaCombinations: Combination[] = [
    { note: 'Es', positions: ['1/2/4']},
    { note: 'E', positions: ['2/4']},
    { note: 'Eis', positions: ['2/4']},

    { note: 'Fes', positions: ['2/4']},
    { note: 'F', positions: ['4']},
    { note: 'Fis', positions: ['2/3']},

    { note: 'Ges', positions: ['2/3']},
    { note: 'G', positions: ['1/2']},
    { note: 'Gis', positions: [1]},

    { note: 'As ', positions: [1]},
    { note: 'A', positions: [2]},
    { note: 'Ais', positions: [0]},
    
    { note: 'B', positions: [0]},
    { note: 'H', positions: ['2/4']},
    { note: 'His', positions: ['2/4']},

    { note: 'ces', positions: ['2/4']},
    { note: 'c', positions: ['4']},
    { note: 'cis', positions: ['2/3']},

    { note: 'des', positions: ['2/3']},
    { note: 'd', positions: ['1/2']},
    { note: 'dis', positions: [1]},
    
    { note: 'es', positions: [1]},
    { note: 'e', positions: [2, '2/4']},
    { note: 'eis', positions: [2, '2/4'],},
    
    { note: 'fes', positions: [2, '2/4']},
    { note: 'f', positions: [0, 4]},
    { note: 'fis', positions: ['2/3']},
    
    { note: 'ges', positions: ['2/3']},
    { note: 'g', positions: ['1/2', 3]},
    { note: 'gis', positions: [1, '1/2/3']},
    
    { note: 'as', positions: [1, '1/2/3']},
    { note: 'a', positions: [2, '1/3']},
    { note: 'ais', positions: [0, '2/3']},
    
    { note: 'b', positions: [0, '2/3']},
    { note: 'h', positions: ['1/2', 3]},
    { note: 'his', positions: ['1/2', 3]},

    { note: "ces'", positions: ['1/2', 3]},
    { note: "c'", positions: [1, '1/3']},
    { note: "cis'", positions: [2, '2/3']},
    
    { note: "des'", positions: [2, '2/3']},
    { note: "d'", positions: [0, '1/2']},
    { note: "dis'", positions: [1]},
    
    { note: "es'", positions: [1]},
    { note: "e'", positions: [2, '1/2/3']},
    { note: "eis'", positions: [2, '1/2/3']},
    
    { note: "fes'", positions: [2, '1/2/3']},
    { note: "f'", positions: [0, '1/3']},
    { note: "fis'", positions :['2/3']},
    
    { note : "ges'", positions :['2/3']},
    { note : "g'", positions :['1/2', 3]},
    { note : "gis'", positions :[1]},
    
    { note : "as'", positions :[1]},
    { note : "a'", positions :[2]},
    { note : "ais'", positions :[0]},

    { note : "b'", positions :[0]}
];
