import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { API_KEY } from '$env/static/private';
import { PUBLIC_KEY } from '$env/static/public';

// Evaluated dynamically at runtime
// This means if your environment variables change, the value will be updated at runtime, you don't have to rebuild your app
console.log('env $env/dynamic/private is ', env);
// Static environment variables are evaluated at build time and injected in the code
console.log('env $env/static/private is ', API_KEY);

console.log('env $env/dynamic/public is ', publicEnv);
console.log('env $env/static/public is ', PUBLIC_KEY);
// only runs in the server
// how are we going to load data when using client navigation? (from home to product page)
// if you look at network, a special request __data.json?x-sveltekit... is going to be sent and this request is going to run load function on the server and come back with the data that you are returning
// you can access object from +layout.server.ts using parent
// if we are not navigating using client (e.g refresh), we are not going to send __data because our data is already rendered on the server
export const load: PageServerLoad = async ({
	parent,
	url,
	route,
	params,
	fetch,
	depends,
	cookies,
	getClientAddress,
	locals,
	platform,
	setHeaders
}) => {
	console.log('Products Load Function.');
	const parentData = await parent(); // can be multiple. e.g objects by nested layouts
	// if you need to fetch data depending on user, then use await, or else don't because you are blocking rendering

	console.log('/products load function', locals);

	// console.log(parentData);

	const products = await (await import('$lib/dummy-products.json')).default;

	// this will just call GET function in api/products (not an http request)
	// And not only the plus page, the server TS, but when we use it on the server, we can make credentials
	// requests.
	// Because it inherits the cookie and authorization headers for the page request.
	const response = await fetch('/api/products');
	depends('app:productsServerLoad');

	// when you return items in your object that you return for the data of your page,
	// you can return promises directly without to await them.
	// await response.json() -> response.json()
	// by default svelte is going to await any promises that you return in any one of these keys
	// if this is a top level key, not in a nested key!!!
	if (response.ok) {
		return {
			products: response.json()
		};
	}

	const errorJSON = await response.json();

	throw error(response.status, errorJSON.message);

	return {
		products
	};
};

export const ssr = false;
// export const csr = false;
