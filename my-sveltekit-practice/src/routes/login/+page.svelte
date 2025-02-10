<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { Snapshot } from './$types';

	// assume you need to preserve these two when we navigate away and then back to this page
	let username = '';
	let password = '';

	export const snapshot: Snapshot<{ username: string; password: string }> = {
		// not working
		capture: () => {
			return {
				username,
				password
			};
		},
		restore: (value) => {
			username = value.username;
			password = value.password;
		}
	};

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});
		const resJSON = await response.json();
		if (response.ok) {
			// goto('/', {
			// 	invalidateAll: true // re-run load functions that you are navigating to
			// });
			invalidateAll(); // re-run all load functions in our application, this is perfect when we login logout (refresh the whole application)... can use await
		} else {
			alert(resJSON.message);
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<label for="username">Username</label><br />
	<input bind:value={username} id="username" name="username" placeholder="Username" />
	<br /><br />

	<label for="password">Password</label><br />
	<input
		bind:value={password}
		id="password"
		name="password"
		placeholder="Password"
		type="password"
	/>

	<br /><br />

	<button type="submit">Login</button>
</form>
