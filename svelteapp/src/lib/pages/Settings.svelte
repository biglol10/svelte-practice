<script>
	import { onDestroy } from 'svelte';
	import settings from '../stores/settings';
	import direction from '../stores/direction';

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
		// if you need to access methods in our store, we don't have to use dollar sign
		settings.toggleColorScheme();
	}}>Toggle Color Scheme</button
>

<button
	on:click={() => {
		settings.updateSetting('language', Math.random());
	}}>Update language</button
>
<button
	on:click={() => {
		settings.reset();
	}}>Reset Settings</button
>
<br />
{$direction}
<br />
{$settings.colorScheme}
<br />
{$settings.language}
<br />
<label>
	<input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="dark" /> Dark
</label>
<label>
	<input type="radio" bind:group={$settings.colorScheme} name="colorScheme" value="light" /> Light
</label>

<select bind:value={$settings.language}>
	<option value="en">English</option>
	<option value="ar">Arabic</option>
</select>
