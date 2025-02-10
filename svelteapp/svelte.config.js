import sveltePreprocess from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: '@use "src/styles/variables.scss";'
		}
	})
};

export default config;


// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// export default {
//   // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
//   // for more information about preprocessors
//   preprocess: vitePreprocess()
// }

// export default {
//   // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
//   // for more information about preprocessors
//   preprocess: [
//     vitePreprocess(),
//     preprocess({
//       scss: {
//         // Optional: you can add Sass options here
//         // prependData: '@import "src/styles/variables.scss";' // Optional: global imports
//       }
//     })
//   ],
// }