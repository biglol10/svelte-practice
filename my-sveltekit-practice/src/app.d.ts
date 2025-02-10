// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	// interface PageData {
	// 	products?: { id: number }[];
	// }
	interface Locals {
		user?: {
			id: number;
			name: string;
		};
	}
	interface Error {
		// already has message. This is for {$page.error?.code}
		code?: string;
	}
}
