<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores'; // contains information about current page, // a way to get data from page to root layout
	import { goto, invalidateAll } from '$app/navigation';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

{#if data.user}
	<p>Logged in as {data.user.name}</p>
{/if}

<nav>
	<a href="/">Home</a>
	<a href="/products">Products</a>
	{#if !data.user}
		<a href="/login">Login</a>
	{/if}
</nav>

{#if data.user}
	<button
		on:click={async () => {
			const response = await fetch('/api/logout', { method: 'POST' });

			if (response.ok) {
				invalidateAll();
				// if layout load function was rerun any other load function that was using the data it returns will also rerun because it depends on it
				// for example +page.ts in login
			}
		}}
	>
		Logout
	</button>
{/if}

<slot />
