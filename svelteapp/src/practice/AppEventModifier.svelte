<script>
	import Button from './lib/Button.svelte';
	import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';
</script>

<!-- * can add once modifier to the event handler to prevent it from being called multiple times -->
<Button
	on:click|once={(event) => {
		alert('ASDF');
	}}
	let:isLeftHovered
	size="small"
	shadow
	disabled
>
	<div style:width="20px" slot="leftContent">
		{#if isLeftHovered}
			<FaAngellist />
		{:else}
			<FaAllergies />
		{/if}
	</div>
	Button Text
</Button>

<style>
</style>
