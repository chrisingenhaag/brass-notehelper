<script lang="ts">
  import { onMount } from 'svelte';
  import { getNextNote, getNoteFromString, getPreviousNote, getStaffPosition, getTrombonePosition, isValidNote, type Accidental, type Note } from '$lib/trombonePositions';
  import { _ } from 'svelte-i18n';

  let selectedNote: Note = 'B';
  
  const LINE_SPACING = 20;

  $: currentNote = selectedNote;
  $: currentAccidental = getNoteFromString(selectedNote)?.accidental;

  function handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      selectedNote = getNextNote(currentNote);
    } else if (event.key === 'ArrowDown') {
      selectedNote = getPreviousNote(currentNote);
    }
  }

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
        selectedNote = getNextNote(currentNote);
      } else {
        // Swipe down
        selectedNote = getPreviousNote(currentNote);
      }
      touchStartY = touchCurrentY;
    }
  }

  let scrolledAmount = 0;
  const SCROLL_SENSITIVITY = 15; // pixels needed to trigger a note change

  function handleWheel(event: WheelEvent) {
    event.preventDefault();    

    scrolledAmount += event.deltaY;
    if (Math.abs(scrolledAmount) > SCROLL_SENSITIVITY) {
      if (event.deltaY < 0) {
        // Scroll up
        selectedNote = getNextNote(currentNote);
      } else {
        // Scroll down
        selectedNote = getPreviousNote(currentNote);
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

  $: noteY = 180 + (getStaffPosition(currentNote) * LINE_SPACING / 2); // Adjusted center point

  // Calculate which ledger lines should be visible
  $: ledgerLines = [];
  $: {
    //console.log('current note:', currentNote);
    ledgerLines = [];
    if (getStaffPosition(currentNote) <= -8) {
      for (let pos = -8; pos >= getStaffPosition(currentNote); pos -= 2) {
        ledgerLines.push(180 + (pos * LINE_SPACING / 2));
      }
    } else if (getStaffPosition(currentNote) >= 4) {
      // Start from 6 instead of 4 to get the first line correct
      for (let pos = 4; pos <= getStaffPosition(currentNote); pos += 2) {
        ledgerLines.push(180 + (pos * LINE_SPACING / 2));
      }
    }
  }

  $: trombonePositions = isValidNote(currentNote) ? getTrombonePosition(currentNote) : [];
</script>

<svelte:head>
  <title>{$_('title')}</title>
  <meta name="description" content={$_('meta.description')} />
  <meta name="keywords" content={$_('meta.keywords')} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Notenhelferlein - Interaktive Zugtabelle für Posaune" />
  <meta property="og:description" content="Lernen Sie die Positionen der Noten im Bassschlüssel und die entsprechenden Zugpositionen auf der Posaune." />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Notenhelferlein - Interaktive Zugtabelle für Posaune" />
  <meta name="twitter:description" content="Lernen Sie die Positionen der Noten im Bassschlüssel und die entsprechenden Zugpositionen auf der Posaune." />
  
  <!-- Additional Meta -->
  <meta name="author" content="Christian Ingenhaag" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="language" content="de" />
</svelte:head>

<div class="descriptions">
  <p>{$_('description')}</p>
  <p>{$_('instrument')}</p>
</div>

<div class="note-value">
  {currentNote}
  {#if trombonePositions.length > 0}
    <span class="position">({trombonePositions.join(' or ')})</span>
  {/if}
</div>

<div 
  class="staff-container"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:wheel|preventDefault={handleWheel}
>
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
    <!-- Bass Clef Symbol -->

    <!-- F clef dots -->
    <circle cx="95" cy="130" r="3" fill="black"/>
    <circle cx="95" cy="150" r="3" fill="black"/>
    
    <!-- Staff Lines -->
    <line x1="20" y1="120" x2="380" y2="120" stroke="black" />
    <line x1="20" y1="140" x2="380" y2="140" stroke="black" />
    <line x1="20" y1="160" x2="380" y2="160" stroke="black" />
    <line x1="20" y1="180" x2="380" y2="180" stroke="black" />
    <line x1="20" y1="200" x2="380" y2="200" stroke="black" />
    
    <!-- Ledger Lines -->
    {#each ledgerLines as y}
      <line 
        x1="170" 
        y1={y} 
        x2="230" 
        y2={y} 
        stroke="black" 
        stroke-width="1.5"
      />
    {/each}

    <!-- Accidental -->
    {#if currentAccidental}
      <text 
        x={165} 
        y={noteY + 8} 
        class="accidental-symbol" 
        fill="black"
      >{currentAccidental}</text>
    {/if}

    <!-- Note -->
    <ellipse 
      cx="200" 
      cy={noteY} 
      rx="14" 
      ry="10" 
      fill="black" 
      transform="rotate(-20, 200, {noteY})"
    />
    
    <!-- Note stem -->
    {#if getStaffPosition(currentNote) >= -2}
      <line 
        x1="212" 
        y1={noteY} 
        x2="212" 
        y2={noteY - 70} 
        stroke="black" 
        stroke-width="3"
      />
    {:else}
      <line 
        x1="188" 
        y1={noteY} 
        x2="188" 
        y2={noteY + 70} 
        stroke="black" 
        stroke-width="3"
      />
    {/if}
  </svg>
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

  svg {
    background-color: #f0f0f0;
    width: 100%; /* Make SVG fill container */
    height: auto; /* Maintain aspect ratio */
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

  .accidental-symbol {
    font-family: "Times New Roman", serif;
    font-size: 36px;
  }
</style>
