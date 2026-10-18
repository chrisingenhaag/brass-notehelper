import { defineParams } from '@sveltejs/kit/params';
import { Instrument } from '#lib/positionBase.js';

const matchInstrument = (param: string): param is Instrument =>
	(Object.values(Instrument) as string[]).includes(param);

export const params = defineParams({
	instrument: (param) => (matchInstrument(param) ? param : undefined)
});
