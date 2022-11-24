import { cast } from 'mobx-state-tree';
import type { Card } from './MtgStore';
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

const parseCardData = (data: CardData): Card => {
	return cast({
		id: data.id,
		name: data.name,
		imageURL: data.image_uris?.normal
	});
};

type CardData = {
	name: string;
	id: string;
	image_uris: {
		normal: string;
	};
};
