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
		await setupStore(this.#store);
		setTimeout(this.#onFinish, 1000);
	}

	get store(): Store {
		return this.#store;
	}
}
