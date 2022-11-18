import { flow, Instance, types, cast } from 'mobx-state-tree';

export const CardType = types.model({
	id: types.identifier,
	name: types.string
});

export type Card = Instance<typeof CardType>;

export const RandomCardType = types.model({
	card: types.maybeNull(types.reference(CardType)),
	state: types.enumeration(['empty', 'loading', 'done', 'error'])
});

export type RandomCard = Instance<typeof RandomCardType>;

export const MtgStoreType = types.model({
	cards: types.array(CardType),
	randomCard: RandomCardType
});

export type MtgStore = Instance<typeof MtgStoreType>;

export const defaultMtgStore = (): MtgStore => {
	return MtgStoreType.create({
		cards: [],
		randomCard: {
			state: 'empty'
		}
	});
};
