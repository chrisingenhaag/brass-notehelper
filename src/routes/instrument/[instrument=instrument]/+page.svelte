<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getNextNote,
		getPreviousNote,
		getInstrumentPosition,
		instrumentConfig,
		isValidNote,
		type Note
	} from '$lib/positionBase';
	import { _ } from 'svelte-i18n';
	import StaffSystem from '$lib/components/StaffSystem.svelte';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	// derived, because SvelteKit reuses this component when navigating between instruments
	let selectedInstrument = $derived(params.instrument);
	let system = $derived(instrumentConfig[selectedInstrument].system);

	// writable derived: resets to the start note when the instrument changes
	let selectedNote: Note = $derived(instrumentConfig[selectedInstrument].startNote);

	function handleKeydown(event: { key: string }) {
		if (event.key === 'ArrowUp') {
			selectedNote = getNextNote(selectedInstrument, selectedNote);
		} else if (event.key === 'ArrowDown') {
			selectedNote = getPreviousNote(selectedInstrument, selectedNote);
		}
	}

	// Touch handling for mobile devices
	let touchStartY = 0;
	const TOUCH_SENSITIVITY = 25; // pixels needed to trigger a note change

	function handleTouchStart(event: TouchEvent) {
		touchStartY = event.touches[0].clientY;
	}

	// no preventDefault: Svelte registers touchmove as passive; touch-action: none stops scrolling
	function handleTouchMove(event: TouchEvent) {
		const touchCurrentY = event.touches[0].clientY;
		const deltaY = touchCurrentY - touchStartY;

		if (Math.abs(deltaY) > TOUCH_SENSITIVITY) {
			if (deltaY < 0) {
				// Swipe up
				selectedNote = getNextNote(selectedInstrument, selectedNote);
			} else {
				// Swipe down
				selectedNote = getPreviousNote(selectedInstrument, selectedNote);
			}
			touchStartY = touchCurrentY;
		}
	}

	// Mouse wheel handling for desktop
	let scrolledAmount = 0;
	const SCROLL_SENSITIVITY = 15; // pixels needed to trigger a note change

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		scrolledAmount += event.deltaY;
		if (Math.abs(scrolledAmount) > SCROLL_SENSITIVITY) {
			if (event.deltaY < 0) {
				// Scroll up
				selectedNote = getNextNote(selectedInstrument, selectedNote);
			} else {
				// Scroll down
				selectedNote = getPreviousNote(selectedInstrument, selectedNote);
			}
			scrolledAmount = 0; // Reset after processing
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	let instrumentPositions = $derived(
		isValidNote(selectedInstrument, selectedNote)
			? getInstrumentPosition(selectedInstrument, selectedNote)
			: []
	);
	let combinations = $derived(instrumentConfig[selectedInstrument].combinations);
	let noteIndex = $derived(combinations.findIndex((c) => c.note === selectedNote));
</script>

<div class="mt-2 text-center">
	<p>{$_('description')}</p>
	<p>{$_('instrumentPrefix')} <b>{$_('instruments.' + selectedInstrument)}</b></p>
</div>

<div class="note-value">
	{selectedNote}
	{#if instrumentPositions.length > 0}
		<span class="position">({instrumentPositions.join(' ' + $_('textElements.or') + ' ')})</span>
	{/if}
</div>

<div
	class="staff-container flex justify-center"
	role="slider"
	tabindex="0"
	aria-label={$_('instruments.' + selectedInstrument)}
	aria-valuemin={0}
	aria-valuemax={combinations.length - 1}
	aria-valuenow={noteIndex}
	aria-valuetext={[selectedNote, ...instrumentPositions].join(' ')}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	onwheel={handleWheel}
>
	<StaffSystem note={selectedNote} {system} />
</div>

<style>
	.staff-container {
		touch-action: none; /* Prevent browser touch handling */
		overflow: hidden; /* Prevent page scrolling when using wheel */
		width: 100%; /* Make container full width */
		max-width: 800px; /* Optional: limit maximum width */
		margin: 0 auto; /* Center horizontally */
	}

	.note-value {
		font-size: 2rem;
		text-align: center;
	}

	.position {
		font-size: 2rem;
		margin-left: 1rem;
	}
</style>
