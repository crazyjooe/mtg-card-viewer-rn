import MockAdapter from 'axios-mock-adapter';
import { NetworkClient } from '../../networking/NetworkClient';
import { defaultMtgStore, MtgStore } from '../../store/cards/MtgStore';

console.log = jest.fn();
console.error = jest.fn();
describe('MtgStore', () => {
	const mockAdapter = new MockAdapter(NetworkClient.axiosInstance);
	describe('random card', () => {
		let store: MtgStore;

		beforeEach(() => {
			store = defaultMtgStore();
			mockAdapter.reset();
		});

		it('should have correct default state', () => {
			expect(store.randomCard.card).toBeUndefined();
			expect(store.randomCard.state).toBe('empty');
		});

		describe('when loading next card', () => {
			describe('with correct response', () => {
				beforeEach(() => {
					mockRandomCardRequest(mockAdapter);
				});

				it('should set correct loading state', () => {
					store.loadNextRandomCard();
					expect(store.randomCard.state).toBe('loading');
				});

				it('should correct done state', async () => {
					await store.loadNextRandomCard();
					expect(store.randomCard.state).toBe('done');
				});
				it('should set random card correctly', async () => {
					await store.loadNextRandomCard();

					expect(store.randomCard.card).toEqual({
						id: '123',
						name: 'Test Card',
						imageURL: 'https://image.com'
					});
				});
			});

			describe('with error response', () => {
				beforeEach(() => {
					mockRandomCardRequest(mockAdapter, 500);
				});

				it('should set correct error state', async () => {
					await store.loadNextRandomCard();
					expect(store.randomCard.state).toBe('error');
				});

				it('should not set random card', async () => {
					await store.loadNextRandomCard();
					expect(store.randomCard.card).toBeUndefined();
				});
			});

			describe('with broken response', () => {
				beforeEach(() => {
					mockRandomCardRequest(mockAdapter, 200, true);
				});

				it('should set correct error state', async () => {
					await store.loadNextRandomCard();
					expect(store.randomCard.state).toBe('error');
				});

				it('should not set random card', async () => {
					await store.loadNextRandomCard();
					expect(store.randomCard.card).toBeUndefined();
				});
			});
		});
	});

	describe('set list', () => {
		let store: MtgStore;

		beforeEach(() => {
			store = defaultMtgStore();
		});

		it('should have correct default state', () => {
			expect(store.setList.sets).toEqual([]);
			expect(store.setList.state).toBe('empty');
		});

		describe('when loading set', () => {
			describe('with correct response', () => {
				beforeEach(() => {
					mockSetListRequest(mockAdapter);
				});

				it('should set correct loading state', () => {
					store.loadSets();
					expect(store.setList.state).toBe('loading');
				});

				it('should correct done state', async () => {
					await store.loadSets();
					expect(store.setList.state).toBe('done');
				});
				it('should set list correctly', async () => {
					await store.loadSets();

					expect(store.setList.sets).toEqual([
						{
							id: '1',
							code: 'code',
							name: 'Test set',
							releaseDate: '1990-12-02',
							cardCount: 69,
							iconURL: 'https://icon.com',
							cards: []
						}
					]);
				});
			});

			describe('with error response', () => {
				beforeEach(() => {
					mockSetListRequest(mockAdapter, 500);
				});

				it('should set correct error state', async () => {
					await store.loadSets();
					expect(store.setList.state).toBe('error');
				});
			});

			describe('with broken response', () => {
				beforeEach(() => {
					mockSetListRequest(mockAdapter, 200, true);
				});

				it('should set correct error state', async () => {
					await store.loadSets();
					expect(store.setList.state).toBe('error');
				});
			});
		});
	});
});

const mockRandomCardRequest = (adapter: MockAdapter, status: number = 200, isBrokenResponse: boolean = false) => {
	adapter.onGet('https://api.scryfall.com/cards/random').reply(status, {
		name: 'Test Card',
		image_uris: {
			normal: 'https://image.com'
		},
		...(!isBrokenResponse && { id: '123' })
	});
};

const mockSetListRequest = (adapter: MockAdapter, status: number = 200, isBrokenResponse: boolean = false) => {
	adapter.onGet('https://api.scryfall.com/sets').reply(status, {
		data: [
			{
				code: 'code',
				name: 'Test set',
				released_at: '1990-12-02',
				card_count: 69,
				icon_svg_uri: 'https://icon.com',
				...(!isBrokenResponse && { id: '1' })
			}
		]
	});
};
