import { applySnapshot, IDisposer, onSnapshot, getRoot } from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Store } from './Store';

const STORE_KEY = 'store_v1';

let _disposer: IDisposer | undefined;

export async function setupStore(store: Store) {
	let restoredState: any = {};

	try {
		const storeData = await AsyncStorage.getItem(STORE_KEY);
		console.log(storeData);
		if (storeData) {
			restoredState = JSON.parse(storeData);
			applySnapshot(store, restoredState);
		}
	} catch (error) {
		console.log('Failed to restore store state: ', error);
	}

	if (_disposer) _disposer();

	_disposer = onSnapshot(store, (snapshot) => {
		AsyncStorage.setItem(STORE_KEY, JSON.stringify(snapshot));
	});

	const unsubscribe = () => {
		if (_disposer) _disposer();

		_disposer = undefined;
	};

	return { store, restoredState, unsubscribe };
}
