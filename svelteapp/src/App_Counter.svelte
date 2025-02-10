<script>
	import Counter from './lib/Counter.svelte';
	let name = 'Svelte';
	let src = 'https://picsum.photos/200/200';
	let string = 'Some <strong>bold</strong> text with html';

	const maxCount = 6;
	const props = {
		maxCount: 10,
		initialCount: 3,
	};
</script>

<img {src} alt="random image {name}" />
<h1>Hello {name.toLocaleLowerCase()}</h1>
<!-- <Counter initialCount={3} {maxCount} /> -->
<Counter {...props} />

<style>
	h1 {
		color: red;
	}
</style>
