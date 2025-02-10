<script>
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	import { Button } from '$components';
	import { navigating } from '$app/stores';

	$: console.log($navigating);

	beforeNavigate((navigation) => {
		console.log('beforeNavigate', navigation);
		// navigation.cancel()
	});

	// page load
	afterNavigate((navigation) => {
		console.log('afterNavigate', navigation);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button
	on:click={() => {
		goto('/about'); // js needs to be working
	}}>Go to About</button
>

<Button />

<a href="/about">About</a>
