import { castToSnapshot } from 'mobx-state-tree';
import type { Card, CardSet } from './MtgStore';
import { NetworkClient } from '../../networking/NetworkClient';

export const loadRandomCard = async (): Promise<Card> => {
	try {
		console.log('Loafing random card...');
		const response = await NetworkClient.get<CardData>('cards/random');

		if (response.ok && response.data) {
			const card = parseCardData(response.data);
			console.log('Loaded random card: ', card);
			return card;
		} else {
			throw new Error('Failed to load random card: ' + response.problem);
		}
	} catch (error) {
		console.error(error);
		throw new Error('Failed to load random card: ' + error);
	}
};

export const loadSetList = async (): Promise<CardSet[]> => {
	try {
		console.log('Loading set list...');
		const response = await NetworkClient.get<SetListData>('sets');

		if (response.ok && response.data) {
			const sets = response.data.data.map(parseCardSetData);
			console.log(`Loaded ${sets.length} sets`);
			return sets;
		} else {
			throw new Error('Failed to load set list: ' + response.problem);
		}
	} catch (error) {
		console.error(error);
		throw new Error('Failed to load set list: ' + error);
	}
};

const parseCardData = (data: CardData): Card => {
	return castToSnapshot({
		id: data.id,
		name: data.name,
		imageURL: data.image_uris?.normal
	});
};

const parseCardSetData = (data: SetData): CardSet => {
	return castToSnapshot({
		id: data.id,
		name: data.name,
		code: data.code,
		releaseDate: data.released_at,
		cardCount: data.card_count,
		iconURL: data.icon_svg_uri,
		cards: []
	});
};

type CardData = {
	name: string;
	id: string;
	image_uris: {
		normal: string;
	};
};

type SetListData = {
	data: SetData[];
};

type SetData = {
	id: string;
	name: string;
	code: string;
	card_count: number;
	released_at: string;
	icon_svg_uri: string;
};
