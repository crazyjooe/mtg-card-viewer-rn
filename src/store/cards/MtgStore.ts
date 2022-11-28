import { flow, Instance, types } from 'mobx-state-tree';
import { loadRandomCard } from './MtgStoreLoaders';

export const CardModel = types.model('Card').props({
	id: types.identifier,
	name: types.string,
	imageURL: types.maybe(types.string)
});

export type Card = Instance<typeof CardModel>;

export const RandomCardType = types.model('RandomCard').props({
	card: types.maybe(types.reference(CardModel)),
	state: types.enumeration(['empty', 'loading', 'done', 'error'])
});

export type RandomCard = Instance<typeof RandomCardType>;

export const MtgStoreModel = types
	.model('MtgStore')
	.props({
		cards: types.array(CardModel),
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

export type MtgStore = Instance<typeof MtgStoreModel>;

export const defaultMtgStore = (): MtgStore => {
	return MtgStoreModel.create({
		cards: [],
		randomCard: {
			card: undefined,
			state: 'empty'
		}
	});
};
