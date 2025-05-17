// +layout.ts
import { browser } from '$app/environment'
import '$lib/i18n' // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'
import { defaultLocale } from '$lib/i18n'

export const load: LayoutLoad = async () => {
	if (browser) {
		const lang = window.navigator.language ? window.navigator.language.split('-')[0] : defaultLocale;
		locale.set(lang)
	}
	await waitLocale()
}