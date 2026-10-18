// src/lib/i18n/index.ts
import { browser } from '$app/env';
import { init, register } from 'svelte-i18n';

export const defaultLocale = 'de';
export const supportedLocales = ['de', 'en'];

register('en', () => import('./locales/en.json'));
register('de', () => import('./locales/de.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
