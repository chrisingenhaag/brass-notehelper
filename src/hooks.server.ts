// hooks.server.ts
import { defaultLocale, supportedLocales } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const requested = event.request.headers.get('accept-language')?.split(',')[0]?.split('-')[0];
	const lang = supportedLocales.find((l) => l === requested) ?? defaultLocale;
	locale.set(lang);
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
