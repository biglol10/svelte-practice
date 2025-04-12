import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	// 원래는 login 대신 default였음 (actions에 아무것도 넣을 필요 없었음 -> using named actions)
	login: async ({ request, cookies, url, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!username) {
			return fail(400, { usernameMissing: true });
		}
		if (!password) {
			return fail(400, { passwordMissing: true });
		}

		cookies.set('token', 'token_value', {
			path: '/'
		});

		locals.user = { name: 'John', id: 1 };

		// return { success: true };

		// 303 -> redirecting post request to get request
		// throw redirect(303, '/');
		throw redirect(303, url.searchParams.get('redirectTo') || '/'); // to go to the same page you were. you need (form method="POST" action="/login?redirectTo={$page.url.pathname}")
	},
	logout: ({ cookies, url, locals }) => {
		cookies.delete('token', { path: '/' });
		locals.user = undefined;
		throw redirect(303, url.searchParams.get('redirectTo') || '/');
	}
};
