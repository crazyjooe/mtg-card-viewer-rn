import { Store } from '../store/StoreProvider';
import { defaultMtgStore } from '../store/cards/MtgStore';

interface AppBootstrapperParams {
	onFinish: () => void;
}

export class AppBootstrapper {
	#store: Store;
	#onFinish: () => void;

	constructor(params: AppBootstrapperParams) {
		this.#onFinish = params.onFinish;
		this.#store = { cardStore: defaultMtgStore() };

		this.start();
	}

	async start(): Promise<void> {
		setTimeout(this.#onFinish, 1000);
	}

	get store(): Store {
		return this.#store;
	}
}
