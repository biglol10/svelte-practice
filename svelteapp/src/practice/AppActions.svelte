<script>
	import longpress from './lib/actions/longpress';

	let showButton = true;
	let duration = 1000;
</script>

<label>
	<input type="range" bind:value={duration} max={4000} step={100} />
	{duration}ms
</label>
<label><input type="checkbox" bind:checked={showButton} />Toggle</label>
<!-- action is a function that will run when our element is created in the DOM -->
<!-- on:longpress={() => {}} want to use smth like this -->
{#if showButton}
	<button
		use:longpress={{ duration }}
		on:longpress={() => {
			alert('pressed');
		}}>Hello</button
	>
{/if}

<style></style>
