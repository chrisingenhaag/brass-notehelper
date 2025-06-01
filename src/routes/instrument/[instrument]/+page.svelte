<script lang="ts">
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import { getNextNote, getPreviousNote, getStaffPosition, getInstrumentPosition, Instrument, isValidNote, type Note } from '$lib/positionBase';
  import { _ } from 'svelte-i18n';
	import { NoteBases } from '$lib/instrumentPositions';
  import StaffSystem from '$lib/components/StaffSystem.svelte';

	let { data }: PageProps = $props();

  
  let selectedInstrument = data.instrument as Instrument; // Default instrument
  let localizedInstrument = $_('instruments.' + selectedInstrument);
    
  let selectedNote: Note = $state('B');

  let currentNote = $derived(selectedNote);

  function handleKeydown(event) {
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

  let trombonePositions = $derived(isValidNote(selectedInstrument, currentNote) ? getInstrumentPosition(selectedInstrument, currentNote) : []);
</script>

<div class="descriptions">
  <p>{$_('description')}</p>
  <p>{$_('instrumentPrefix')} <b>{localizedInstrument}</b></p>
</div>

<div class="note-value">
  {currentNote}
  {#if trombonePositions.length > 0}
    <span class="position">({trombonePositions.join(' '+$_('textElements.or')+' ')})</span>
  {/if}
</div>

<div 
  class="staff-container"
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  onwheel={handleWheel}
>
  <StaffSystem
    note={currentNote}
  />
</div>

<style>
  .staff-container {
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none; /* Prevent browser touch handling */
    overflow: hidden; /* Prevent page scrolling when using wheel */
    width: 100%; /* Make container full width */
    max-width: 800px; /* Optional: limit maximum width */
    margin: 0 auto; /* Center horizontally */
  }

  .descriptions {
    text-align: center;
    margin-top: 2rem;
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
