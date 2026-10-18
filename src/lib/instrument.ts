// A plain object instead of an enum: src/params.ts imports this file and SvelteKit loads it
// with Node directly, which only strips erasable TypeScript syntax (no enums, explicit extensions).
export const Instrument = {
	Trombone: 'trombone',
	Horn: 'horn',
	Tuba: 'tuba',
	Trumpetc: 'trumpetc'
} as const;

export type Instrument = (typeof Instrument)[keyof typeof Instrument];
