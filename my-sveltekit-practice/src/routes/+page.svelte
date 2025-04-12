<script lang="ts">
	import { goto, preloadCode, preloadData } from '$app/navigation';
</script>

<h1>Home</h1>
<!-- when you need to pre-load your data without having link -->
<button
	on:focus={() => {}}
	on:mouseover={async () => {
		await preloadData('/products');
	}}
	on:click={() => {
		goto('/products', {
			noScroll: true
		});
	}}>Products</button
>
