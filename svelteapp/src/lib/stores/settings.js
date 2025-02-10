import { writable } from 'svelte/store';

const defaultSettings = {
	colorScheme: 'dark',
	language: 'en',
	fontSize: 12,
};

// deried store is a store based on another store
function createSettingsStore() {
	// if you don't do ...defaultSettings, the original defaultSetting can be mutated and reset will not work properly
	const { subscribe, set, update } = writable({ ...defaultSettings });

	return {
		subscribe,
		set,
		update,
		updateSetting: (setting, value) => {
			update((settings) => ({ ...settings, [setting]: value }));
		},
		toggleColorScheme: () => {
			update((settings) => ({
				...settings,
				colorScheme: settings.colorScheme === 'dark' ? 'light' : 'dark',
			}));
		},
		reset: () => {
			set({ ...defaultSettings });
		},
	};
}

export default createSettingsStore();
