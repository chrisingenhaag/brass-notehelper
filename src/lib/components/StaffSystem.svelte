<script lang="ts">
	import { NoteBasesInBassClef } from "$lib/instrumentPositions";
	import { getStaffPosition, type Note, ScoreSystem } from "$lib/positionBase";

  let {
    note,
    system
  }: {
    note: Note;
    system: ScoreSystem
  } = $props();

  const LINE_SPACING = 20;

  // Calculate which ledger lines should be visible
  let ledgerLines: number[] = $derived.by(() => {
    let ledgerLines = [];
    if (getStaffPosition(note, system) <= -8) {
      for (let pos = -8; pos >= getStaffPosition(note, system); pos -= 2) {
        ledgerLines.push(180 + (pos * LINE_SPACING / 2));
      }
    } else if (getStaffPosition(note, system) >= 4) {
      // Start from 6 instead of 4 to get the first line correct
      for (let pos = 4; pos <= getStaffPosition(note, system); pos += 2) {
        ledgerLines.push(180 + (pos * LINE_SPACING / 2));
      }
    }
    return ledgerLines;
  });

  let noteY = $derived(180 + (getStaffPosition(note, system) * LINE_SPACING / 2)); // Adjusted center point
  let currentAccidental = $derived(NoteBasesInBassClef.get(note)?.accidental);


</script>

<svg viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
  {#if system === ScoreSystem.Bass}  
    <!-- Bass Clef Symbol (authentic, filled, with dots) -->
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
    style="fill:#131516;stroke:#131516;stroke-width:0"/>
    <circle cx="95" cy="130" r="3" fill="black"/>
    <circle cx="95" cy="150" r="3" fill="black"/>
  {/if}

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
  {#if getStaffPosition(note, system) >= -2}
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

<style>
  svg {
    background-color: #f0f0f0;
    width: 100%;
    height: auto;
  }
  .accidental-symbol {
    font-family: "Times New Roman", serif;
    font-size: 36px;
  }
</style>