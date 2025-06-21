<script lang="ts">
	import { Instrument, instrumentStaffSystemMap } from '$lib/positionBase';
  import { _ } from 'svelte-i18n';

  // iterate over Instrument enum to create a list of instruments
  var instruments: Instrument[] = Object.values(Instrument);

</script>

<section class="welcome">
  <h1 class="text-2xl mb-1">{$_('welcome.title')}</h1>
  <p>
    {$_('welcome.description')}
  </p>
  <nav class="instrument-links flex flex-col justify-center mt-4 gap-6">
    {#each instruments as instrument}
      <a href="/instrument/{instrument}/{instrumentStaffSystemMap[instrument]}">{$_('instruments.' + instrument)}</a>
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
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
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