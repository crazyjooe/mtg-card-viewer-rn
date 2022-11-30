import { setupStore } from '../../store/storeLoader';
import { Store, createDefaultStore } from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSnapshot } from 'mobx-state-tree';

console.log = jest.fn();
describe('setupStore', () => {
	let testStore: Store;

	beforeEach(() => {
		testStore = createDefaultStore();
	});

	describe('when no snapshot is stored', () => {
		beforeEach(() => {
			jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
		});

		it('should keep store in the default state', async () => {
			await setupStore(testStore, 'test_store_key');

			expect(getSnapshot(testStore)).toEqual(getSnapshot(createDefaultStore()));
		});
	});

	describe('when snapshot is stored', () => {
		beforeEach(() => {
			jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(
				`{"cardStore": { "cards": [], "randomCard": { "state": "done" } }}`
			);
		});

		it('should apply stored snapshot correctly', async () => {
			await setupStore(testStore, 'test_store_key');

			console.log(getSnapshot(testStore));

			expect(getSnapshot(testStore)).toEqual({
				cardStore: { cards: [], randomCard: { card: undefined, state: 'done' } }
			});
		});
	});

	describe('when snapshot is incorrect', () => {
		beforeEach(() => {
			jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(
				`{"wrongStore": { "what": [], "not": { "state": "gone" } }}`
			);
		});

		it('should throw', async () => {
			expect(async () => {
				await setupStore(testStore, 'test_store_key');
			}).rejects.toThrow('Failed to restore');
		});
	});
});
