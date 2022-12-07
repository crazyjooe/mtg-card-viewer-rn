import AsyncStorage from '@react-native-async-storage/async-storage';
import { applySnapshot, IDisposer, onSnapshot } from 'mobx-state-tree';
import type { Store } from './Store';

const STORE_KEY = 'store_v1';

let _disposer: IDisposer | undefined;

export async function setupStore(store: Store, store_key: string = STORE_KEY) {
	let restoredState: any = {};

	try {
		const storeData = await AsyncStorage.getItem(store_key);
		if (storeData) {
			console.log(`Found previous app state for key ${store_key}, restoring...`);
			restoredState = JSON.parse(storeData);
			applySnapshot(store, restoredState);
		}
	} catch (error) {
		console.log('Failed to restore app state: ', error);
		console.log('Starting with empty store state');
	}

	if (_disposer) _disposer();

	_disposer = onSnapshot(store, (snapshot) => {
		AsyncStorage.setItem(store_key, JSON.stringify(snapshot));
	});

	const unsubscribe = () => {
		if (_disposer) _disposer();

		_disposer = undefined;
	};

	return { store, restoredState, unsubscribe };
}
