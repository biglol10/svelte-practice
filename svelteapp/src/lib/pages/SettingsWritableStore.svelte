<script>
	import { onDestroy } from 'svelte';
	import settings from '../stores/settings';

	console.log(settings);

	// let colorScheme;

	// // subscribe to use values from store
	// const unsubscribe = settings.subscribe((settings) => {
	//     console.log('settings subscribe')
	//     colorScheme = settings.colorScheme;
	// })

	// $: {
	//     settings.update((prevSettings) => ({...prevSettings, colorScheme}))
	// }

	// onDestroy(() => {
	//     unsubscribe();
	// })
</script>

<h2>Settings</h2>

<button
	on:click={() => {
		$settings.colorScheme = $settings.colorScheme === 'dark' ? 'light' : 'dark';
	}}>Toggle Color Scheme</button
>

<label>
	<input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="dark" /> Dark
</label>
<label>
	<input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="light" /> Light
</label>
