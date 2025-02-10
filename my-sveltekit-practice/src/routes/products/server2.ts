// if you need to control your routes, response and return something other than HTML, create +server.ts file

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// localhost:5173/products (application/json) to call this request
export const GET: RequestHandler = async () => {
	const products = await (await import('$lib/dummy-products.json')).default;

	// throw error(401, 'Not authorized!');

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
