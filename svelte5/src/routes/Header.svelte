<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createState, ScottState } from './state.svelte';

	let {
		name,
		fake_name = null
		// children,
		// secondChild
	}: {
		name: string;
		fake_name?: string | null;
		// children: Snippet;
		// secondChild: Snippet;
	} = $props();

	const myState = createState();
	const myStateTwo = new ScottState();
</script>

<div>
	<!-- {#if name}
		<h1>{name}'s form</h1>
	{/if} -->

	<h1>{name ? name : 'User'}'s form</h1>

	<!-- {@render children()}

	<h3>{@render secondChild('Scott')}</h3> -->

	<button onclick={() => myState.up()}>Up {myState.value}</button>

	<button onclick={() => myStateTwo.up()}>Up {myStateTwo.value}</button>
</div>

<!-- <h2>{name.replace('t', 'X')}</h2> -->
<!-- {fake_name} -->

<style>
	/* :global(div) {
		background: blue;
	} */
</style>
