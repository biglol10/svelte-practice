// // e.g fetch user from server
// import type { LayoutServerLoad } from './$types';

// // not loaded again when we do client-side navigation, because it is already rendered
// export const load: LayoutServerLoad = ({ cookies }) => {
// 	const token = cookies.get('token');
// 	// get the user from the token
// 	const user = { name: 'John', id: 1 };
// 	return {
// 		user: token ? user : null
// 	};

// 	// available to all pages (data.user.name)
// 	return { user };
// };

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const user = locals.user; // from hooks.server.ts
	return {
		user
	};
};
