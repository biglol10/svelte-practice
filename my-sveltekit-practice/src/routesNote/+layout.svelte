<script>
	import { page } from '$app/stores';

	// (frontent) -> layout group
</script>

<div style:background="#f03" style:padding="10px">
	<h3>Root Layout</h3>

	<slot />

	<footer style:margin-top="60px">All rights reserved.</footer>
</div>

<!-- conditional layout -->
<!-- {#if $page.url.pathname.startsWith('/settings')}
	<slot />
{:else}
	<div style:background="#f03" style:padding="10px">
		<h3>Root Layout</h3>
		<nav>
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/settings">Settings</a>
		</nav>

		<slot />

		<footer style:margin-top="60px">All rights reserved.</footer>
	</div>
{/if} -->
