import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// will run every time the svelte server receives a request
// event contains stuff like cookies and fetch url
// resolve is a function that we call in order to render the route and generate the response
// overriding the default bevaviour of svelte-kit
export const handle1: Handle = async ({ event, resolve }) => {
	const { url, locals, cookies } = event;
	// if (url.pathname === '/products') {
	// 	return new Response('Custom response');
	// }

	// event.isDataRequest

	// if (!isDataRequest && !url.pathname.startsWith('/api')) {
	if (!url.pathname.startsWith('/api')) {
		const token = cookies.get('token');

		// need to set in app.d.ts
		// locals.user will be available in any server load function
		locals.user = token ? { name: 'John', id: 1 } : undefined;
	}

	// if isDataRequest is present, we cannot go to home page when we login. because of the condition above and if (user) throw redirect(307, '/'); in login/+page.ts

	// https://svelte.dev/docs/kit/hooks#Server-hooks-handle
	const response = await resolve(event);

	console.log('event url is ', event.url.pathname);
	// console.log('isDataRequest is ', isDataRequest);

	// response.headers.set('x-custom-header', 'value');

	return response;
};

// can have multiple handle functions handle1, handle2,...
export const handle = sequence(handle1);

// it allows us to modify smth when we call fetch on the server (+page.ts, +page.server.ts)
// fetch in load already inherits cookies and authorization headers as long as we are sending a same origin request
// but if external url/api, use this
export const handleFetch: HandleFetch = ({ request, event, fetch }) => {
	// https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch
	if (request.url.startsWith('https://dummyjson.com/')) {
		const cookie = event.request.headers.get('cookie');
		if (cookie) {
			request.headers.set('cookie', cookie);
		}
	}

	return fetch(request);
};

// handling unexpected errors and customizing
// test this by const response = await fettch('/api/products');
export const handleError: HandleServerError = ({ error, event }) => {
	console.log('This is coming from handleError.');
	console.log(error, event); // Send to sentry or any error logging service.

	return {
		message: 'An unexpected error has occurred.',
		code: 'UNEXPECTED' // <h3>Code: {$page.error?.code}</h3> in +error.svelte
	};
};
