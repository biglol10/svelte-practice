<script lang="ts">
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	export let data: PageData;

	$: products = data.products.products;
	// server console also shows up
	// $: console.log(products[0]);

	// since our data is rendered on the server, we are going to get out content in the html itself
	// not generated in the browser, just comming from the server
</script>

<!-- {JSON.stringify(products)} -->

<h2>{data.title}</h2>

<button
	on:click={() => {
		// invalidate('https://dummyjson.com/products'); // any load function that depends on 'https://dummyjson.com/products' url will be rerun
		// invalidate('app:products');
		// invalidate((url) => {
		// 	return url.hostname === 'dummyjson.com'; // any load function that depends on a url that has a host name of domain dummyjson.com, invalidate
		// });
		// invalidate('/api/products'); // rerun load function in page.server.ts, currently there is a bug
		invalidate('app:productsServerLoad'); // no bug when depends
	}}>Re-run load function</button
>

{#if products && products.length > 0}
	<ul>
		{#each products as product}
			<li>
				<img src={product.thumbnail} alt={product.title} />
				<h3><a href="/product/{product.id}">{product.title}</a></h3>
				<p>{product.description}</p>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px;
	}
	img {
		width: 100%;
	}
</style>
