import type { ParamMatcher } from '@sveltejs/kit';
import { Instrument } from '$lib/positionBase';

export const match = ((param: string): param is Instrument =>
	(Object.values(Instrument) as string[]).includes(param)) satisfies ParamMatcher;
