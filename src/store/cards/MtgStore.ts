import { flow, Instance, types } from 'mobx-state-tree';
import { loadRandomCard } from './MtgStoreLoaders';

export const CardType = types.model({
	id: types.identifier,
	name: types.string,
	imageURL: types.maybe(types.string)
});

export type Card = Instance<typeof CardType>;

export const RandomCardType = types.model({
	card: types.maybe(types.reference(CardType)),
	state: types.enumeration(['empty', 'loading', 'done', 'error'])
});

export type RandomCard = Instance<typeof RandomCardType>;

export const MtgStoreType = types
	.model({
		cards: types.array(CardType),
		randomCard: RandomCardType
	})
	.actions((self) => {
		const loadNextRandomCard = flow(function* () {
			self.randomCard.state = 'loading';
			try {
				const card = yield loadRandomCard();
				self.cards.push(card);
				self.randomCard.card = card.id;
				self.randomCard.state = 'done';
			} catch (error) {
				console.error(error);
				self.randomCard.state = 'error';
			}
		});
		return { loadNextRandomCard };
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
