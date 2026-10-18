// hooks.server.ts
import { defaultLocale, supportedLocales } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const requested = event.request.headers.get('accept-language')?.split(',')[0]?.split('-')[0];
	const lang = supportedLocales.find((l) => l === requested) ?? defaultLocale;
	// no global locale.set here: the svelte-i18n store is shared by all concurrent requests
	event.locals.lang = lang;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
