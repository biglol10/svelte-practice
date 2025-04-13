<script lang="ts">
	import Header from './Header.svelte';

	let formState = $state({
		name: '',
		birthday: '',
		step: 0,
		error: ''
	});
</script>

<Header name={formState.name} />
<main>
	<p>Step: {formState.step + 1}</p>

	{#if formState.error}
		<p class="error">{formState.error}</p>
	{/if}

	{#if formState.step === 0}
		<div>
			<label for="name">Your name</label>
			<input type="text" id="name" bind:value={formState.name} />
		</div>
		<button
			onclick={() => {
				if (formState.name !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Name is required';
				}
			}}>Next</button
		>
	{:else if formState.step === 1}
		<div>
			<label for="birthday">Your birthday</label>
			<input type="date" id="birthday" bind:value={formState.birthday} />
		</div>
		<button
			onclick={() => {
				if (formState.birthday !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Birthday is required';
				}
			}}>Next</button
		>
	{/if}
</main>

<style>
	.error {
		color: red;
	}
</style>
