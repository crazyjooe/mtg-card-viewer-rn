import { createDefaultStore } from '../store/Store';
import { setupStore } from '../store/storeLoader';
import type { Store } from '../store/Store';

interface AppBootstrapperParams {
	onFinish: () => void;
}

export class AppBootstrapper {
	#store: Store;
	#onFinish: () => void;

	constructor(params: AppBootstrapperParams) {
		this.#onFinish = params.onFinish;
		this.#store = createDefaultStore();
		this.start();
	}

	async start(): Promise<void> {
		console.log('Initializing application...');

		console.log('Hydrating store...');
		await setupStore(this.#store);

		console.log('Baking some cookies...');
		setTimeout(this.#onFinish, 1000);

		console.log('Application initialized!');
	}

	get store(): Store {
		return this.#store;
	}
}
