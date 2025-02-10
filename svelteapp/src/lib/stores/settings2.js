import { writable } from 'svelte/store';

const settings = writable(
	{
		colorScheme: 'dark',
		language: 'en',
		fontSize: 12,
	},
	(set) => {
		// runs when the number of subscribers goes from 0 to 1
		console.log('from 0 to 1');
		// const timer = setTimeout(() => {
		// 	set({
		// 		colorScheme: 'light',
		// 		language: 'en',
		// 		fontSize: 12,
		// 	});
		// }, 2000);

		// from 1 to 0
		return () => {
			console.log('from 1 to 0');

			// clearTimeout(timer);
		};
	},
);

export default settings;
