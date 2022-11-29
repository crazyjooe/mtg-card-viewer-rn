import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import { useCardStore } from '../../store/StoreProvider';
import { ThemedStyleSheet, useThemedStyles } from '../../ui/theme/Theme';
import { ThemeContextType } from '../../ui/theme/types';

export const RandomCardScreen = observer(() => {
	const store = useCardStore();
	const themedStyles = useThemedStyles(styles);

	return (
		<View style={themedStyles.container}>
			<Text>{store.randomCard.card?.name}</Text>
			<View>
				<Image
					resizeMode="contain"
					style={{ width: 300, height: 500 }}
					source={{ uri: store.randomCard.card?.imageURL }}
				/>
			</View>
			<Button title="Load Next" onPress={store.loadNextRandomCard} color={themedStyles.loadNextButton.color} />
		</View>
	);
});

const styles = ThemedStyleSheet.create((context: ThemeContextType) => ({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: context.theme.backgroundColor
	},
	loadNextButton: {
		color: context.theme.linkColor
	}
}));
