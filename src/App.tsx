import React, { useEffect } from 'react';
import { Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { observer } from 'mobx-react-lite';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useCardStore } from './store/StoreProvider';
import { AppBootstrapperProvider, useAppBootstrapper } from './bootstrapper/AppBoostrapperProvider';
import { AppBootstrappedProviders } from './bootstrapper/AppBootstrappedProviders';

const App = () => {
	return (
		<AppBootstrapperProvider>
			<MainApp />
		</AppBootstrapperProvider>
	);
};

const MainApp = () => {
	const { bootstrappingFinished } = useAppBootstrapper();
	const isDarkMode = useColorScheme() === 'dark';

	if (!bootstrappingFinished) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		);
	}

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<AppBootstrappedProviders>
			<SafeAreaView style={backgroundStyle}>
				<StatusBar
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					backgroundColor={backgroundStyle.backgroundColor}
				/>
				<RandomCardScreen />
			</SafeAreaView>
		</AppBootstrappedProviders>
	);
};

const RandomCardScreen = observer(() => {
	const store = useCardStore();

	useEffect(() => {
		store.loadNextRandomCard();
	}, [store]);

	return (
		<View style={styles.container}>
			<Text>{store.randomCard.card?.name}</Text>
			<View>
				<Image
					resizeMode="contain"
					style={{ width: 300, height: 500 }}
					source={{ uri: store.randomCard.card?.imageURL }}
				/>
			</View>
			<Button title="Load Next" onPress={store.loadNextRandomCard} />
		</View>
	);
});

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		width: '100%',
		height: '100%'
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600'
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400'
	},
	highlight: {
		fontWeight: '700'
	}
});

export default App;
