<script lang="ts">
	import '../app.css';
	import '../lib/i18n';

	import { _, locale } from 'svelte-i18n';
	import { resolve } from '$app/paths';

	let { children, data } = $props();

	// The svelte-i18n store is global on the server. Setting it here, synchronously at the
	// start of rendering, means no other request can switch it before this page is rendered.
	// Messages are already loaded by +layout.ts, so set() takes effect immediately.
	// svelte-ignore state_referenced_locally
	locale.set(data.lang);
</script>

<svelte:head>
	<title>{$_('title')}</title>
	<meta name="description" content={$_('meta.description')} />
	<meta name="keywords" content={$_('meta.keywords')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={$_('title')} />
	<meta property="og:description" content={$_('meta.description')} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={$_('title')} />
	<meta name="twitter:description" content={$_('meta.description')} />

	<!-- Additional Meta -->
	<meta name="author" content="Christian Ingenhaag" />
</svelte:head>

<div class="container mx-auto max-w-prose shadow-md lg:w-1/2">
	<div class="navbar bg-base-100 shadow-sm">
		<div class="flex-1">
			<span class="text-2xl">{$_('navTitle')}</span>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
				>
					<li><a class="text-base" href={resolve('/')}>{$_('menu.items.home')}</a></li>
					<li><a class="text-base" href={resolve('/about')}>{$_('menu.items.about')}</a></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 content-center gap-6">
		{@render children()}
	</div>

	<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
		<aside>
			<p>
				Copyright © {new Date().getFullYear()} -
				<a href="https://github.com/chrisingenhaag/brass-notehelper"
					>chrisingenhaag/brass-notehelper</a
				>
			</p>
		</aside>
	</footer>
</div>
