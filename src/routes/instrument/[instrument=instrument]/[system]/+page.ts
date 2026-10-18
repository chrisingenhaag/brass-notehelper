import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { PageLoad } from './$types';

// Old URLs carried the clef (/instrument/trombone/bass); it is now derived from the instrument.
export const load: PageLoad = ({ params }) => {
	redirect(308, resolve('/instrument/[instrument=instrument]', { instrument: params.instrument }));
};
