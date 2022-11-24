import * as React from 'react';

import { useAppBootstrapper } from './AppBoostrapperProvider';
import { StoreProvider } from '../store/StoreProvider';

export const AppBootstrappedProviders = (props: { children: React.ReactNode }): JSX.Element => {
	const { appBootstrapper } = useAppBootstrapper();

	return <StoreProvider store={appBootstrapper?.store}>{props.children}</StoreProvider>;
};
