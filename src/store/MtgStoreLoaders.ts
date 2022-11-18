import { cast, castToSnapshot } from 'mobx-state-tree';
import type { Card } from './MtgStore';
import { NetworkClient } from '../networking/NetworkClient';

export const loadRandomCard = async (): Promise<Card> => {
	try {
		const response = await NetworkClient.get<CardData>('cards/random');
		const card = { name: response.data?.name ?? 'Unknown' };
		return card;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to load random card');
	}
};

type CardData = {
	name: string;
};
