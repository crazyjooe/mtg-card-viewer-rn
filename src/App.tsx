/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, type PropsWithChildren } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button,
	Image
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import { NetworkClient } from './networking/NetworkClient';
import { StoreProvider, useCardStore } from './store/StoreProvider';
import { observer } from 'mobx-react-lite';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<StoreProvider>
			<SafeAreaView style={backgroundStyle}>
				<StatusBar
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					backgroundColor={backgroundStyle.backgroundColor}
				/>
				<RandomCardScreen />
			</SafeAreaView>
		</StoreProvider>
	);
};

const RandomCardScreen = observer(() => {
	const store = useCardStore();

	useEffect(() => {
		store.loadNextRandomCard();
	}, [store]);

	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

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
