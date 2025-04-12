import type { PageLoad } from './$types';
// import { env } from '$env/dynamic/private'; // Cannot import $env/dynamic/private into client-side code
import { env as publicEnv } from '$env/dynamic/public';
import { PUBLIC_KEY } from '$env/static/public';

// When you use the dynamic module environment variables, module in your client code, the values will have to be sent from the server to the client, which can cause a larger network request
// So if possible, it will be preferred to use static environment variables
console.log(publicEnv);
console.log(PUBLIC_KEY);

// should be load
// runs on both server and client (shared load function)
// specifing in app.d.ts and here, but does not work in async functions
// if there is +page.ts and +page.server.ts, then the server is going to be available as an argument in the load function. data parameter is whatever is returned from +page.server
export const load: PageLoad = async ({
	data,
	url,
	route,
	params,
	parent,
	fetch,
	depends,
	setHeaders
}) => {
	console.log('Products Load Function.');

	// console.log(data); // products list because of +page.server.ts
	// console.log(await parent()); // data by parent layouts

	// setHeaders({
	// 	age: '100',
	// 	'cache-control': 'max-age=604800'
	// });

	// when loading a file, we need to load its default export, so .default (Promise)
	// const products = await (await import('$lib/dummy-products.json')).default;
	// return {
	// 	products: data.products,
	// 	title: 'Products List'
	// 	// products: [{id: 5}]
	// };

	fetch('https://dummyjson.com/products');
	fetch('https://dummyjson.com/users');
	depends('app:products'); // identifier
	return {
		products: data.products,
		title: 'Products List'
	};
};
