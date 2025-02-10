<script context="module">
	let allVideos = new Set();

	export function playAll() {
		allVideos.forEach((video) => {
			video.play();
		});
	}
	export function pauseAll() {
		allVideos.forEach((video) => {
			video.pause();
		});
	}
</script>

<script>
	import { onDestroy, onMount } from 'svelte';

	export let src = undefined;

	let video;
	let paused = true;
	let currentTime = 0;
	let volume = 0;

	onMount(() => {
		allVideos.add(video);
	});
	onDestroy(() => {
		allVideos.delete(video);
	});
</script>

<video
	bind:this={video}
	class:playing={!paused}
	{src}
	controls
	muted
	bind:paused
	bind:volume
	bind:currentTime
	on:play={() => {
		// will not work with play all
		// allVideos.forEach((_video) => {
		// 	if (_video !== video) _video.pause();
		// });
	}}
/>

<button
	on:click={() => {
		paused = !paused;
	}}>{paused ? 'Play' : 'Pause'}</button
>

<p>{currentTime}</p>
<p>{volume}</p>

<style>
	video.playing {
		outline: 4px solid #ff3e00;
	}
</style>
