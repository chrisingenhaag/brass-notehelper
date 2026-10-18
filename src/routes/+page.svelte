<script lang="ts">
	import { Instrument } from '$lib/positionBase';
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';

	// iterate over Instrument enum to create a list of instruments
	var instruments: Instrument[] = Object.values(Instrument);
</script>

<section class="welcome">
	<h1 class="mb-1 text-2xl">{$_('welcome.title')}</h1>
	<p>
		{$_('welcome.description')}
	</p>
	<nav class="instrument-links mt-4 flex flex-col justify-center gap-6">
		{#each instruments as instrument (instrument)}
			<a
				href={resolve('/instrument/[instrument=instrument]', {
					instrument
				})}>{$_('instruments.' + instrument)}</a
			>
		{/each}
	</nav>
</section>

<style>
	.welcome {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		background: #f8f8fa;
		border-radius: 10px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
		text-align: center;
	}
	.instrument-links a {
		font-size: 1.2rem;
		color: #1976d2;
		text-decoration: none;
		padding: 0.5rem 1.2rem;
		border-radius: 5px;
		background: #e3eafc;
		transition: background 0.2s;
	}
	.instrument-links a:hover {
		background: #bbd0f7;
	}
</style>
