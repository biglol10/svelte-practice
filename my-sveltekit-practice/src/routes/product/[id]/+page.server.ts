import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// if param changes this function will re-run. (default is run only once)
export const load: PageServerLoad = async ({ params }) => {
	// const products = await (await import('$lib/dummy-products.json')).default;
	// const product = products.products.find((p) => p.id === +params.id);

	// if (!product) {
	// 	// throw redirect(301, '/products');
	// 	throw error(404, { message: 'Product not found!', code: 'N' });
	// }

	// // pass data to $page
	// return {
	// 	product,
	// 	title: product.title,
	// 	description: product.description
	// };

	const productRes = await fetch(`https://dummyjson.com/products/${params.id}`);

	if (!productRes.ok) {
		throw error(productRes.status, 'Failed to load product!');
	}

	const product = await productRes.json();

	const comments = fetch('https://dummyjson.com/comments').then((res) => res.json());

	return {
		product,
		title: product.title,
		description: product.description,
		nested: {
			comments: await comments // wait for comments to be resolved in the browser (nested)
			// 현재 await 안쓰면 에러 발생해서 await 추가
		}
	};
};

// And finally, it is only recommended to do that in a plus page.

// The server, the RTS file in a server load function and not in the universal load function that you

// can have in a plus page.

// The TS file.

// Because if you return nested data in a universal load function, the data is not going to be streamed

// from the server to the client.

// However, the promise is going to be recreated when the load function runs in the browser.
