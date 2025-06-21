import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	return {
		instrument: params.instrument,
		system: params.system
	};
};