<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let name = 'John';

	// localhost:5173/about
	// localhost:5173/en/about
	// routes/about should be removed
	// [[lang]] to make optional param
	// you cannot use optional prameters with rest paramaters
</script>

<h1>About {name}</h1>

{JSON.stringify($page.params)}

<button
	on:click={() => {
		goto('/');
	}}>Go to Home</button
>

<style></style>
