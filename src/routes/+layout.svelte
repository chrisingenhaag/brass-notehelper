<script lang="ts">
	import '../app.css';
  import '../lib/i18n';

  import { _ } from 'svelte-i18n';

	let { children } = $props();
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

<div class="container mx-auto shadow-md lg:w-1/2 max-w-prose">
	<div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <span class="text-2xl">{$_('navTitle')}</span>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a class="text-base" href="/">{$_('menu.items.home')}</a></li>
        <li><a class="text-base" href="/about">{$_('menu.items.about')}</a></li>
      </ul>
    </div>
    </div>
	</div>
	
  <div class="grid grid-cols-1 gap-6 content-center">
	  {@render children()}
  </div>

  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - <a href="https://github.com/chrisingenhaag/brass-notehelper">chrisingenhaag/brass-notehelper</a></p>
  </aside>
</footer>
</div>
