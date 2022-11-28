import * as React from 'react';
import { MtgStore, defaultMtgStore } from './cards/MtgStore';
import { Store } from './Store';

interface StoreContext {
	store: Store | null;
}

const DefaultStoreContext = React.createContext<StoreContext>({
	store: null
});

export const useStore = (): Store => {
	const { store } = React.useContext(DefaultStoreContext);

	if (!store) {
		throw new Error('Store not initialized');
	}

	return store;
};

export const useCardStore = (): MtgStore => {
	const { store } = React.useContext(DefaultStoreContext);

	if (!store) {
		throw new Error('Store not initialized');
	}

	return store.cardStore;
};

export const StoreProvider = (props: { store?: Store; children: React.ReactNode }): JSX.Element => {
	return (
		<DefaultStoreContext.Provider value={{ store: props.store ?? { cardStore: defaultMtgStore() } }}>
			{props.children}
		</DefaultStoreContext.Provider>
	);
};
