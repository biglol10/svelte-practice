<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { interpolateRgb } from 'd3-interpolate';

	const boxProps = tweened(
		{ width: 100, height: 100, color: 'purple' },
		{
			duration: 500,
			easing: cubicOut,
			// a is the value we have initially, b is the value that we need to animate to, using t (time) we can animate our values, the second function is what we are going to return our object that we can animate over time
			interpolate: (a, b) => (t) => {
				// We are going to have our previous size, so a dot width and we need to add to it the difference, which
				// is delta width.
				// However, we need to add it gradually based on our time.
				// So if time of zero we need to add zero.
				// If time is 0.1, we need to add 0.1 times the difference until the time is one.
				// Then we need to add the entire difference, which would be delta width times TW or times one in this
				// case.
				// So in order to animate this difference in size, we will just multiply delta delta width times DT.

				const deltaWidth = b.width - a.width;
				const deltaHeight = b.height - a.height;
				const color = interpolateRgb(a.color, b.color)(t);

				return {
					width: a.width + deltaWidth * t,
					height: a.height + deltaHeight * t,
					color,
				};
			},
		},
	);
</script>

<button
	on:click={async () => {
		await boxProps.set(
			{
				width: Math.random() * 500,
				height: Math.random() * 500,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
			},
			{ duration: 4000 },
		);
		console.log('done');
	}}>Random Box</button
>

<div
	style="width: {$boxProps.width}px; height: {$boxProps.height}px; background-color: {$boxProps.color};"
/>

<style></style>
