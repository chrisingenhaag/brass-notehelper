// hooks.server.ts
import { defaultLocale } from '$lib/i18n'
import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')?.[0]?.split('-')?.[0] ?? defaultLocale
	if (lang) {
		locale.set(lang)
	}
	return resolve(event)
}