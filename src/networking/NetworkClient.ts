import { create } from 'apisauce';

export const NetworkClient = create({
	baseURL: 'https://api.scryfall.com/',
	timeout: 5000
});
