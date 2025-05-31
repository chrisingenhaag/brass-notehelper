import type { Combination } from "./positionBase";

export const tromboneCombinations: Combination[] = [
    { note: 'Es', positions: ['Q3-'], staffPosition: 4, accidental: '♭' },
    { note: 'E', positions: [7], staffPosition: 4 },
    { note: 'Eis', positions: [6], staffPosition: 4, accidental: '♯' },

    { note: 'Fes', positions: [7], staffPosition: 3, accidental: '♭' },
    { note: 'F', positions: [6], staffPosition: 3 },
    { note: 'Fis', positions: [5], staffPosition: 3, accidental: '♯' },

    { note: 'Ges', positions: [5], staffPosition: 2, accidental: '♭' },
    { note: 'G', positions: [4], staffPosition: 2 },
    { note: 'Gis', positions: [3], staffPosition: 2, accidental: '♯' },

    { note: 'As ', positions: [3], staffPosition: 1, accidental: '♭' },
    { note: 'A', positions: [2], staffPosition: 1 },
    { note: 'Ais', positions: [1], staffPosition: 1, accidental: '♯' },
    
    { note: 'B', positions: [1], staffPosition: 0, accidental: '♭' },
    { note: 'H', positions: [7], staffPosition: 0 },
    { note: 'His', positions: [6], staffPosition: 0, accidental: '♯' },

    { note: 'ces', positions: [7], staffPosition: -1, accidental: '♭' },
    { note: 'c', positions: [6], staffPosition: -1 },
    { note: 'cis', positions: [5], staffPosition: -1, accidental: '♯' },

    { note: 'des', positions: [5], staffPosition: -2, accidental: '♭' },
    { note: 'd', positions: [4], staffPosition: -2 },
    { note: 'dis', positions: [3], staffPosition: -2, accidental: '♯' },
    
    { note: 'es', positions: [3], staffPosition: -3, accidental: '♭' },
    { note: 'e', positions: [2], staffPosition: -3 },
    { note: 'eis', positions: [1], staffPosition: -3, accidental: '♯' },
    
    { note: 'fes', positions: [2], staffPosition: -4, accidental: '♭' },
    { note: 'f', positions: [1], staffPosition: -4 },
    { note: 'fis', positions: [5], staffPosition: -4, accidental: '♯' },
    
    { note: 'ges', positions: [5], staffPosition: -5, accidental: '♭' },
    { note: 'g', positions: [4], staffPosition: -5 },
    { note: 'gis', positions: [3], staffPosition: -5, accidental: '♯' },
    
    { note: 'as', positions: [3], staffPosition: -6, accidental: '♭' },
    { note: 'a', positions: [2], staffPosition: -6 },
    { note: 'ais', positions: [1], staffPosition: -6, accidental: '♯' },
    
    { note: 'b', positions: [1], staffPosition: -7, accidental: '♭' },
    { note: 'h', positions: [4], staffPosition: -7 },
    { note: 'his', positions: [3], staffPosition: -7, accidental: '♯' },

    { note: "ces'", positions: [4], staffPosition: -8, accidental: '♭' },
    { note: "c'", positions: [3], staffPosition: -8 },
    { note: "cis'", positions: [2], staffPosition: -8, accidental: '♯' },
    
    { note: "des'", positions: [2], staffPosition: -9, accidental: '♭' },
    { note: "d'", positions: [1, 4], staffPosition: -9 },
    { note: "dis'", positions: [3], staffPosition: -9, accidental: '♯' },
    
    { note: "es'", positions: [3], staffPosition: -10, accidental: '♭' },
    { note: "e'", positions: [2], staffPosition: -10 },
    { note: "eis'", positions: [1], staffPosition: -10, accidental: '♯' },
    
    { note: "fes'", positions: [2], staffPosition: -11, accidental: '♭' },
    { note: "f'", positions: [1], staffPosition: -11 },
    { note: "fis'", positions :[3], staffPosition : -11, accidental: '♯'},
    
    { note : "ges'", positions :[3], staffPosition : -12, accidental: '♭'},
    { note : "g'", positions :[2, 4], staffPosition : -12},
    { note : "gis'", positions :[1,3], staffPosition : -12, accidental: '♯'},
    
    { note : "as'", positions :[1,3], staffPosition : -13, accidental: '♭'},
    { note : "a'", positions :[2], staffPosition : -13},
    { note : "ais'", positions :[1], staffPosition : -13, accidental: '♯'},

    { note : "b'", positions :[1], staffPosition : -14, accidental: '♭'}
];

export const hornCombinations: Combination[] = [
    { note: 'E', positions: ['1/2/3'], staffPosition: 4 },
    { note: 'Eis', positions: ['1/2/3'], staffPosition: 4, accidental: '♯' },

    { note: 'Fes', positions: ['1/2/3'], staffPosition: 3, accidental: '♭' },
    { note: 'F', positions: ['1/3'], staffPosition: 3 },
    { note: 'Fis', positions: ['2/3'], staffPosition: 3, accidental: '♯' },

    { note: 'Ges', positions: ['2/3'], staffPosition: 2, accidental: '♭' },
    { note: 'G', positions: ['1/2', 3], staffPosition: 2 },
    { note: 'Gis', positions: [1], staffPosition: 2, accidental: '♯' },

    { note: 'As ', positions: [1], staffPosition: 1, accidental: '♭' },
    { note: 'A', positions: [2], staffPosition: 1 },
    { note: 'Ais', positions: [0], staffPosition: 1, accidental: '♯' },
    
    { note: 'B', positions: [0], staffPosition: 0, accidental: '♭' },
    { note: 'H', positions: ['1/2/3'], staffPosition: 0 },
    { note: 'His', positions: ['1/2/3'], staffPosition: 0, accidental: '♯' },

    { note: 'ces', positions: ['1/2/3'], staffPosition: -1, accidental: '♭' },
    { note: 'c', positions: ['1/3'], staffPosition: -1 },
    { note: 'cis', positions: ['2/3'], staffPosition: -1, accidental: '♯' },

    { note: 'des', positions: ['2/3'], staffPosition: -2, accidental: '♭' },
    { note: 'd', positions: ['1/2', 3], staffPosition: -2 },
    { note: 'dis', positions: [1], staffPosition: -2, accidental: '♯' },
    
    { note: 'es', positions: [1], staffPosition: -3, accidental: '♭' },
    { note: 'e', positions: [2, '1/2/3'], staffPosition: -3 },
    { note: 'eis', positions: [2, '1/2/3'], staffPosition: -3, accidental: '♯' },
    
    { note: 'fes', positions: [2, '1/2/3'], staffPosition: -4, accidental: '♭' },
    { note: 'f', positions: [0], staffPosition: -4 },
    { note: 'fis', positions: ['2/3'], staffPosition: -4, accidental: '♯' },
    
    { note: 'ges', positions: ['2/3'], staffPosition: -5, accidental: '♭' },
    { note: 'g', positions: ['1/2', 3], staffPosition: -5 },
    { note: 'gis', positions: [1, '1/2/3'], staffPosition: -5, accidental: '♯' },
    
    { note: 'as', positions: [1, '1/2/3'], staffPosition: -6, accidental: '♭' },
    { note: 'a', positions: [2, '1/3'], staffPosition: -6 },
    { note: 'ais', positions: [0, '2/3'], staffPosition: -6, accidental: '♯' },
    
    { note: 'b', positions: [0, '2/3'], staffPosition: -7, accidental: '♭' },
    { note: 'h', positions: ['1/2', 3], staffPosition: -7 },
    { note: 'his', positions: ['1/2'], staffPosition: -7, accidental: '♯' },

    { note: "ces'", positions: ['1/2'], staffPosition: -8, accidental: '♭' },
    { note: "c'", positions: [1, '1/3'], staffPosition: -8 },
    { note: "cis'", positions: [2, '2/3'], staffPosition: -8, accidental: '♯' },
    
    { note: "des'", positions: [2, '2/3'], staffPosition: -9, accidental: '♭' },
    { note: "d'", positions: ['1/2', 0], staffPosition: -9 },
    { note: "dis'", positions: [1], staffPosition: -9, accidental: '♯' },
    
    { note: "es'", positions: [1], staffPosition: -10, accidental: '♭' },
    { note: "e'", positions: [2, '1/2/3'], staffPosition: -10 },
    { note: "eis'", positions: [2, '1/2/3'], staffPosition: -10, accidental: '♯' },
    
    { note: "fes'", positions: [2, '1/2/3'], staffPosition: -11, accidental: '♭' },
    { note: "f'", positions: [0, '1/3'], staffPosition: -11 },
    { note: "fis'", positions :['2/3'], staffPosition : -11, accidental: '♯'},
    
    { note : "ges'", positions :['2/3'], staffPosition : -12, accidental: '♭'},
    { note : "g'", positions :['1/2', 3], staffPosition : -12},
    { note : "gis'", positions :[1], staffPosition : -12, accidental: '♯'},
    
    { note : "as'", positions :[1], staffPosition : -13, accidental: '♭'},
    { note : "a'", positions :[2], staffPosition : -13},
    { note : "ais'", positions :[0], staffPosition : -13, accidental: '♯'},

    { note : "b'", positions :[0], staffPosition : -14, accidental: '♭'}
];
