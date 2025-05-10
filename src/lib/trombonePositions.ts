type Note = 'E' | 'F' | 'G' | 'A' | 'H' | 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'h' | "c'" | "d'" | "e'" | "f'" | "g'" | "a'";
type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const positionMap = new Map<Note, Position[]>([
    ['E', [1, 7]],
    ['F', [1]],
    ['G', [4]],
    ['A', [3]],
    ['H', [2]],
    ['c', [6]],
    ['d', [4]],
    ['e', [2]],
    ['f', [1]],
    ['g', [4]],
    ['a', [2]],
    ['h', [4]],
    ["c'", [3]],
    ["d'", [1, 4]],
    ["e'", [2]],
    ["f'", [1]],
    ["g'", [2]],
    ["a'", [2]]
]);

export function getTrombonePosition(note: Note): Position[] {
    const positions = positionMap.get(note);
    if (!positions) {
        throw new Error(`No trombone position found for note: ${note}`);
    }
    return positions;
}

export function isValidNote(note: string): note is Note {
    return positionMap.has(note as Note);
}