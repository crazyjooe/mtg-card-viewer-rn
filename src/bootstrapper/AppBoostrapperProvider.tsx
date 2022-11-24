import * as React from 'react';
import { AppBootstrapper } from './AppBootstrapper';

interface AppBootstrapperContext {
	appBootstrapper: AppBootstrapper | null;
	bootstrappingFinished: boolean;
}

const DefaultAppBootstrapperContext = React.createContext<AppBootstrapperContext>({
	appBootstrapper: null,
	bootstrappingFinished: false
});

let bootstrapper: AppBootstrapper | null;

export const useAppBootstrapper = (): AppBootstrapperContext => {
	return React.useContext(DefaultAppBootstrapperContext);
};

export const AppBootstrapperProvider = (props: {
	bootstrapper?: AppBootstrapper;
	children: React.ReactNode;
}): JSX.Element => {
	const [bootstrappingFinished, setBootstrappingFinished] = React.useState(false);

	bootstrapper = props.bootstrapper ?? new AppBootstrapper({ onFinish: () => setBootstrappingFinished(true) });

	return (
		<DefaultAppBootstrapperContext.Provider value={{ appBootstrapper: bootstrapper, bootstrappingFinished }}>
			{props.children}
		</DefaultAppBootstrapperContext.Provider>
	);
};
