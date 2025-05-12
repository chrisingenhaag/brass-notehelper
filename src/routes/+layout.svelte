<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<div class="container mx-auto shadow-md p-5 mt-3 lg:w-1/2 max-w-prose bg-white">
	<div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Notenhelferlein</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
      </button>
    </div>
	</div>
	
  <div class="grid grid-cols-1 gap-6 content-center">
	  {@render children()}
  </div>

  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - <a href="https://github.com/chrisingenhaag/brass-notehelper">https://github.com/chrisingenhaag/brass-notehelper</a></p>
  </aside>
</footer>
</div>

