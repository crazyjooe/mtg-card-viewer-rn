import { flow, Instance, types } from 'mobx-state-tree';
import { loadRandomCard, loadSetList } from './MtgStoreLoaders';

export const CardModel = types.model('Card').props({
	id: types.identifier,
	name: types.string,
	imageURL: types.maybe(types.string)
});

export const RandomCardModel = types.model('RandomCard').props({
	card: types.maybe(types.reference(CardModel)),
	state: types.enumeration(['empty', 'loading', 'done', 'error'])
});

export const CardSetModel = types.model('Set').props({
	id: types.identifier,
	name: types.string,
	code: types.string,
	cardCount: types.number,
	iconURL: types.maybe(types.string),
	releaseDate: types.string,
	cards: types.array(types.reference(CardModel))
});

export const SetListModel = types.model('SetList').props({
	sets: types.array(types.reference(CardSetModel)),
	state: types.enumeration(['empty', 'loading', 'done', 'error'])
});

export const MtgStoreModel = types
	.model('MtgStore')
	.props({
		cards: types.array(CardModel),
		sets: types.array(CardSetModel),
		setList: SetListModel,
		randomCard: RandomCardModel
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

		const loadSets = flow(function* () {
			self.setList.state = 'loading';
			try {
				const sets = yield loadSetList();
				self.sets.clear();
				self.sets.push(...sets);
				self.setList.sets.clear();
				sets.forEach((element: CardSet) => {
					self.setList.sets.push(element.id);
				});
				self.setList.state = 'done';
			} catch (error) {
				console.error(error);
				self.setList.state = 'error';
			}
		});
		return { loadNextRandomCard, loadSets };
	});

export type Card = Instance<typeof CardModel>;
export type MtgStore = Instance<typeof MtgStoreModel>;
export type RandomCard = Instance<typeof RandomCardModel>;
export type CardSet = Instance<typeof CardSetModel>;
export type SetList = Instance<typeof SetListModel>;

export const defaultMtgStore = (): MtgStore => {
	return MtgStoreModel.create({
		cards: [],
		sets: [],
		randomCard: {
			card: undefined,
			state: 'empty'
		},
		setList: {
			sets: [],
			state: 'empty'
		}
	});
};
