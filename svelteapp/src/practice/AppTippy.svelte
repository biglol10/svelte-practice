<!-- <script>
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	onMount(() => {
		tippy('.tooltip', {
			content: 'tooltip content',
		});
		tippy(button, {
			content: 'text',
		});
	});
</script>

<button class="tooltip">Button</button>
<button class="tooltip" data-tippy-content="some other text">Button</button> -->

<script>
	import tippy from './lib/actions/tippy';

	let content = 'Hello';
</script>

<input bind:value={content} />

<button use:tippy={{ content, placement: 'right', theme: 'light' }}>Button</button>

<style></style>
