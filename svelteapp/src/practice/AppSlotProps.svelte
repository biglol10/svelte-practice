<script>
	import Button from './lib/Button.svelte';
	import FaAngellist from 'svelte-icons/fa/FaAngellist.svelte';
	import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';
</script>

<Button let:x let:isLeftHovered size="small" shadow>
	<div style:width="20px" slot="leftContent" let:y>
		{#if isLeftHovered}
			<FaAngellist />
			{y}
		{:else}
			<FaAllergies />
			{y}
		{/if}
	</div>
	Button Text and 'x' value passed from Button.svelte is {x}
</Button>

<style></style>
