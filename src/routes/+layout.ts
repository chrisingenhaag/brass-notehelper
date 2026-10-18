// +layout.ts
import { browser } from '$app/env';
import '#lib/i18n/index.js'; // Import to initialize. Important :)
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { defaultLocale } from '#lib/i18n/index.js';

export const load: LayoutLoad = async ({ data }) => {
	const lang = browser ? (window.navigator.language?.split('-')[0] ?? defaultLocale) : data.lang;

	// only load the messages here; +layout.svelte activates the locale synchronously at render time
	await waitLocale(lang);
	return { lang };
};
