<script>
  import { onMount } from 'svelte';

  let notePosition = 0;
  const LINE_SPACING = 20; // Doubled from 10
  
  function handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      notePosition = Math.max(-12, notePosition - 1);
    } else if (event.key === 'ArrowDown') {
      notePosition = Math.min(8, notePosition + 1);
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.addEventListener('keydown', handleKeydown);
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
    console.log('Ledger Lines:', ledgerLines);
  }
</script>

<h1>Note Helper</h1>

<div class="staff-container">
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
  }

  svg {
    background-color: white;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
