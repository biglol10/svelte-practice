import { derived } from 'svelte/store';
import settings from './settings';
import location from './location';

const direction = derived(
	[settings, location],
	([$settings, $location], set) => {
		console.log($settings, $location);
		const timer = setTimeout(() => {
			set($settings.language === 'ar' ? 'rtl' : 'ltr');
		}, 1000);
		return () => {
			// when we don't have subscribers anymore
			clearTimeout(timer);
		};
	},
	'not decided', // initial value
);

export default direction;
