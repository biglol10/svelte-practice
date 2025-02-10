// if you need to control your routes, response and return something other than HTML, create +server.ts file

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// localhost:5173/api/products to call this request
export const GET: RequestHandler = async ({ fetch, locals }) => {
	const products = await (await import('$lib/dummy-products.json')).default;

	console.log('/api/products locals', locals);

	const response = await fetch('https://dummyjson.com/products');

	if (response.ok) {
		const resJSON = await response.json();
		return json(resJSON, {
			status: 200
		});
	}

	throw error(response.status, response.statusText);

	// return new Response(JSON.stringify({ error: 'You are not authorized!' }), {
	// 	status: 401
	// });

	return json(products, {
		status: 200
	});

	// return new Response(JSON.stringify(products), {
	// 	status: 200
	// });
};

export const POST: RequestHandler = async ({ request }) => {
	const product = await request.json(); // { title: 'Some title' }

	if (!product.title) {
		throw error(400, 'Product title is required');
	}

	return json({
		id: 1313,
		title: product.title
	});
};
