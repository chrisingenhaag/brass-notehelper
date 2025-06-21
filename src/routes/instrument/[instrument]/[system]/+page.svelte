<script lang="ts">
  import { onMount } from 'svelte';
  import { getNextNote, getPreviousNote, getInstrumentPosition, Instrument, isValidNote, type Note, type ScoreSystem, getStartNoteForInstrument } from '$lib/positionBase';
  import { _ } from 'svelte-i18n';
  import StaffSystem from '$lib/components/StaffSystem.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

  
  let selectedInstrument = data.instrument as Instrument; // Default instrument
  let system = data.system as ScoreSystem
  let localizedInstrument = $_('instruments.' + selectedInstrument);
    
  let selectedNote: Note = $state(getStartNoteForInstrument(selectedInstrument));

  let currentNote = $derived(selectedNote);

  function handleKeydown(event: { key: string; }) {
    if (event.key === 'ArrowUp') {
      selectedNote = getNextNote(selectedInstrument, currentNote);
    } else if (event.key === 'ArrowDown') {
      selectedNote = getPreviousNote(selectedInstrument, currentNote);
    }
  }

  // Touch handling for mobile devices
  let touchStartY = 0;
  const TOUCH_SENSITIVITY = 25; // pixels needed to trigger a note change

  function handleTouchStart(event: TouchEvent) {
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchMove(event: TouchEvent) {
    event.preventDefault(); // Prevent scrolling
    const touchCurrentY = event.touches[0].clientY;
    const deltaY = touchCurrentY - touchStartY;

    if (Math.abs(deltaY) > TOUCH_SENSITIVITY) {
      if (deltaY < 0) {
        // Swipe up
        selectedNote = getNextNote(selectedInstrument, currentNote);
      } else {
        // Swipe down
        selectedNote = getPreviousNote(selectedInstrument, currentNote);
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
        selectedNote = getNextNote(selectedInstrument, currentNote);
      } else {
        // Scroll down
        selectedNote = getPreviousNote(selectedInstrument, currentNote);
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

  let instrumentPositions = $derived(isValidNote(selectedInstrument, currentNote) ? getInstrumentPosition(selectedInstrument, currentNote) : []);
</script>

<div class="mt-2 text-center">
  <p>{$_('description')}</p>
  <p>{$_('instrumentPrefix')} <b>{localizedInstrument}</b></p>
</div>

<div class="note-value">
  {currentNote}
  {#if instrumentPositions.length > 0}
    <span class="position">({instrumentPositions.join(' '+$_('textElements.or')+' ')})</span>
  {/if}
</div>

<div 
  class="staff-container flex justify-center"
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  onwheel={handleWheel}
>
  <StaffSystem
    note={currentNote}
    system={system}
  />
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
