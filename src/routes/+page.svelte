<script lang="ts">
  import { onMount } from 'svelte';
  import { getTrombonePosition, isValidNote } from '$lib/trombonePositions';

  let notePosition = 0;
  const LINE_SPACING = 20;
  
  // Note mapping for bass clef (position 0 = H/B)
  const noteNames = new Map([
    [4, 'E'],
    [3, 'F'],
    [2, 'G'],
    [1, 'A'],
    [0, 'H'],
    [-1, 'c'],
    [-2, 'd'],
    [-3, 'e'],
    [-4, 'f'],
    [-5, 'g'],
    [-6, 'a'],
    [-7, 'h'],
    [-8, 'c\''],
    [-9, 'd\''],
    [-10, 'e\''],
    [-11, 'f\''],
    [-12, 'g\''],
    [-13, 'a\'']
  ]);

  $: currentNote = noteNames.get(notePosition) || '';

  function handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      notePosition = Math.max(-13, notePosition - 1);
    } else if (event.key === 'ArrowDown') {
      notePosition = Math.min(4, notePosition + 1);
    }
  }

  let touchStartY = 0;
  const TOUCH_SENSITIVITY = 30; // pixels needed to trigger a note change

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
        notePosition = Math.max(-13, notePosition - 1);
      } else {
        // Swipe down
        notePosition = Math.min(4, notePosition + 1);
      }
      touchStartY = touchCurrentY;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  $: noteY = 200 + (notePosition * LINE_SPACING / 2); // Adjusted center point

  // Calculate which ledger lines should be visible
  $: ledgerLines = [];
  $: {
    console.log('Note Position:', notePosition);
    ledgerLines = [];
    if (notePosition <= -8) {
      for (let pos = -8; pos >= notePosition; pos -= 2) {
        ledgerLines.push(200 + (pos * LINE_SPACING / 2));
      }
    } else if (notePosition >= 4) {
      // Start from 6 instead of 4 to get the first line correct
      for (let pos = 4; pos <= notePosition; pos += 2) {
        ledgerLines.push(200 + (pos * LINE_SPACING / 2));
      }
    }
  }

  $: trombonePositions = isValidNote(currentNote) ? getTrombonePosition(currentNote) : [];
</script>

<h1>Note Helper</h1>

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
>
  <svg width="400" height="400">
    <!-- Bass Clef Symbol -->
    <!--
    <path 
      d="M45,180 
         C55,180 63,173 63,165 
         C63,157 55,150 45,150 
         C35,150 27,157 27,165 
         C27,173 35,180 45,180 
         M45,150 
         C45,150 65,162 65,180 
         C65,200 45,220 45,220 
         C45,220 75,215 85,180"
      fill="none"
      stroke="black"
      stroke-width="2.5"
    />-->
    
    <!-- F clef dots -->
    <circle cx="95" cy="150" r="3" fill="black"/>
    <circle cx="95" cy="170" r="3" fill="black"/>
    
    <!-- Staff Lines -->
    <line x1="20" y1="140" x2="380" y2="140" stroke="black" />
    <line x1="20" y1="160" x2="380" y2="160" stroke="black" />
    <line x1="20" y1="180" x2="380" y2="180" stroke="black" />
    <line x1="20" y1="200" x2="380" y2="200" stroke="black" />
    <line x1="20" y1="220" x2="380" y2="220" stroke="black" />
    
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
    <line 
      x1="212" 
      y1={noteY} 
      x2="212" 
      y2={noteY - 70} 
      stroke="black" 
      stroke-width="3"
    />
  </svg>
</div>

<style>
  .staff-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    touch-action: none; /* Prevent browser touch handling */
  }

  svg {
    background-color: white;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .note-value {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .position {
    font-size: 1.5rem;
    color: #666;
    margin-left: 1rem;
  }
</style>
