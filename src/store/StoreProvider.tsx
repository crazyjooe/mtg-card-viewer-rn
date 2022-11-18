import * as React from 'react';
import { MtgStore } from './MtgStore';

export type Store = {
	cardStore: MtgStore;
};

interface StoreContext {
	cardStore: MtgStore | null;
}

const DefaultStoreContext = React.createContext<StoreContext>({
	cardStore: null
});

export const useCardStore = (): MtgStore => {
	const { cardStore } = React.useContext(DefaultStoreContext);

	if (!cardStore) {
		throw new Error('Store not initialized');
	}

	return cardStore;
};

export const StoreProvider = (props: { store: Store; children: React.ReactNode }): JSX.Element => {
	return (
		<DefaultStoreContext.Provider value={{ cardStore: props.store.cardStore }}>
			{props.children}
		</DefaultStoreContext.Provider>
	);
};
