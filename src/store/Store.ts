import { Instance, types, castToSnapshot } from 'mobx-state-tree';
import { MtgStoreModel, defaultMtgStore } from './cards/MtgStore';

export const StoreModel = types.model('Store').props({
	cardStore: MtgStoreModel
});

export const createDefaultStore = () => {
	return StoreModel.create({ cardStore: castToSnapshot(defaultMtgStore()) });
};

export type Store = Instance<typeof StoreModel>;

export type { Card, MtgStore, RandomCard, CardSet, SetList } from './cards/MtgStore';
