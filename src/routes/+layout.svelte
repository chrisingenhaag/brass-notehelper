<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<div class="container mx-auto shadow-md p-5 mt-3 lg:w-1/2 max-w-prose bg-white">
  <div class="grid grid-cols-1 gap-6 content-center">
	{@render children()}
  </div>
</div>

