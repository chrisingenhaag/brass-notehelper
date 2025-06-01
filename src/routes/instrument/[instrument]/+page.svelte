<script lang="ts">
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import { getNextNote, getNoteFromString, getPreviousNote, getStaffPosition, getInstrumentPosition, Instrument, isValidNote, type Note } from '$lib/positionBase';
  import { _ } from 'svelte-i18n';
	import { NoteBases } from '$lib/instrumentPositions';

	let { data }: PageProps = $props();

  
  let selectedInstrument = data.instrument as Instrument; // Default instrument
  let localizedInstrument = $_('instruments.' + selectedInstrument);
  
  const LINE_SPACING = 20;
  
  let selectedNote: Note = $state('B');

  let currentNote = $derived(selectedNote);
  let currentAccidental = $derived(NoteBases.get(currentNote)?.accidental);

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

  let noteY = $derived(180 + (getStaffPosition(currentNote) * LINE_SPACING / 2)); // Adjusted center point

  // Calculate which ledger lines should be visible
  let ledgerLines: number[] = $derived.by(() => {
    let ledgerLines = [];
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
    return ledgerLines;
  });

  let trombonePositions = $derived(isValidNote(selectedInstrument, currentNote) ? getInstrumentPosition(selectedInstrument, currentNote) : []);
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
  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
    <!-- Bass Clef Symbol (authentic, filled, no dots) -->
    <!--<path d="M 1239,8245 C 1397,8138 1515,8057 1591,8001 C 1667,7946 1747,7877 1829,7795 C 1911,7713 1980,7620 2036,7517 C 2080,7441 2118,7353 2149,7253 C 2180,7154 2196,7058 2199,6967 C 2199,6882 2188,6801 2165,6725 C 2143,6648 2105,6585 2051,6534 C 1997,6484 1927,6459 1840,6459 C 1756,6459 1677,6476 1603,6509 C 1530,6543 1478,6597 1449,6673 C 1449,6680 1445,6689 1439,6702 C 1441,6718 1449,6730 1464,6739 C 1479,6748 1492,6752 1504,6752 C 1510,6752 1527,6749 1553,6743 C 1580,6737 1602,6733 1620,6733 C 1673,6733 1720,6752 1763,6789 C 1805,6826 1826,6871 1826,6924 C 1826,6962 1815,6998 1794,7031 C 1773,7064 1744,7091 1707,7110 C 1670,7130 1629,7139 1585,7139 C 1505,7139 1437,7115 1381,7066 C 1326,7016 1298,6953 1298,6874 C 1298,6773 1329,6686 1390,6612 C 1452,6538 1530,6483 1626,6446 C 1721,6408 1817,6390 1915,6390 C 2022,6390 2124,6417 2219,6472 C 2315,6526 2390,6601 2446,6694 C 2502,6788 2531,6888 2531,6996 C 2531,7188 2467,7366 2339,7531 C 2211,7696 2053,7839 1864,7961 C 1738,8044 1534,8156 1253,8297 L 1239,8245 z M 2628,6698 C 2628,6662 2641,6632 2667,6608 C 2692,6583 2723,6571 2760,6571 C 2792,6571 2822,6585 2849,6612 C 2876,6638 2889,6669 2889,6703 C 2889,6739 2875,6770 2849,6795 C 2821,6819 2790,6831 2755,6831 C 2718,6831 2688,6819 2664,6792 C 2640,6766 2628,6735 2628,6698 z M 2628,7222 C 2628,7186 2641,7155 2665,7131 C 2690,7106 2721,7094 2760,7094 C 2792,7094 2821,7107 2849,7134 C 2875,7161 2889,7190 2889,7222 C 2889,7261 2876,7292 2851,7317 C 2825,7342 2795,7355 2760,7355 C 2721,7355 2690,7342 2665,7318 C 2641,7294 2628,7262 2628,7222 z " id="path19" style="fill:#131516;stroke:#131516;stroke-width:3"/>-->

    <path d="M 51,179
      C 55,176 58,174 60,173 
      C 63,171 66,169 68,167 
      C 70,165 72,161 74,158 
      C 75,156 76,154 77,150 
      C 77,149 78,146 78,142 
      C 78,140 78,138 77,135 
      C 76,133 75,132 74,130 
      C 72,129 71,128 68,128 
      C 66,128 63,129 61,129 
      C 59,130 56,132 55,134 
      C 55,134 54,134 54,135 
      C 54,135 54,136 55,136 
      C 55,136 56,136 56,136 
      C 56,136 57,136 57,136 
      C 58,136 59,136 59,136 
      C 61,136 63,136 64,137 
      C 65,138 66,140 66,141 
      C 66,142 65,143 65,144 
      C 64,145 63,146 61,146 
      C 60,147 59,147 58,147 
      C 56,147 54,146 52,145 
      C 51,143 50,141 50,138 
      C 50,136 51,134 53,132 
      C 54,130 57,128 59,127 
      C 63,125 65,124 68,124 
      C 71,124 74,125 77,129 
      C 79,130 82,132 84,135 
      C 86,137 88,140 88,143 
      C 88,148 86,153 82,158 
      C 78,163 74,169 69,173 
      C 65,176 59,179 51,182" 
      id="clef" style="fill:#131516;stroke:#131516;stroke-width:0"/>
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
    {#if ledgerLines.length > 0}
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
    {/if}
    

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
