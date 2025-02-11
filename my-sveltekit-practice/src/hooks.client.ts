import type { HandleClientError } from '@sveltejs/kit';

// test by throwing new Error in +page.ts
export const handleError: HandleClientError = ({ error, event }) => {
	console.log('This is coming from handleError.');
	console.log(error, event); // Send to sentry or any error logging service.

	return {
		message: 'An unexpected error has occurred.',
		code: 'UNEXPECTED'
	};
};
