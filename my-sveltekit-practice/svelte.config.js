import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// files: {  // you can do this
		// 	routes: 'src/pages'
		// }
		alias: {
			$components: 'src/lib/components'
		}
		// env: {
		// 	publicPrefix: 'PUBLIC_' // default
		// }
	}
};

export default config;
