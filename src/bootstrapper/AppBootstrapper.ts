interface AppBootstrapperParams {
	onFinish: () => void;
}

export class AppBootstrapper {
	#onFinish: () => void;

	constructor(params: AppBootstrapperParams) {
		this.#onFinish = params.onFinish;

		this.start();
	}

	async start(): Promise<void> {
		setTimeout(this.#onFinish, 1000);
	}
}
