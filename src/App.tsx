import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DiceIcon from '../img/dice.svg';
import { AppBootstrapperProvider, useAppBootstrapper } from './bootstrapper/AppBoostrapperProvider';
import { AppBootstrappedProviders } from './bootstrapper/AppBootstrappedProviders';
import { RandomCardScreen } from './screens/RandomCard/RandomCardScreen';
import { SetListScreen } from './screens/SetList/SetListScreen';
import { ThemeProvider } from './ui/theme/Theme';

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<AppBootstrapperProvider>
			<AppEntry />
		</AppBootstrapperProvider>
	);
};

const AppEntry = () => {
	const { bootstrappingFinished } = useAppBootstrapper();

	if (!bootstrappingFinished) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<AppBootstrappedProviders>
			<ThemeProvider>
				<MainNavigation />
			</ThemeProvider>
		</AppBootstrappedProviders>
	);
};

const MainNavigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Random Card"
					component={RandomCardScreen}
					options={{
						tabBarIcon: ({ color, size }) => <DiceIcon width={size} height={size} fill={color} />
					}}
				/>
				<Tab.Screen name="List" component={SetListScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		width: '100%',
		height: '100%'
	}
});

export default App;
