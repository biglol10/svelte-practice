import { readable } from 'svelte/store';

const location = readable(null, (set) => {
	let watchId;
	if (navigator.geolocation) {
		// use watchPosition to detect location change (debugger - sensors - location)
		watchId = navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
				const { latitude, longitude } = position.coords;
				set({ latitude, longitude });
			},
			(e) => {
				console.log(e);
			},
		);
	}

	// this runs when we don't have subscribers to our store anymore
	return () => {
		console.log('return in readable');
		if (navigator.geolocation && navigator.geolocation.clearWatch)
			navigator.geolocation.clearWatch(watchId);
		set(null);
	};
});

export default location;
