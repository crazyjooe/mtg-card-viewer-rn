import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useCardStore } from '../../store/StoreProvider';
import { ThemedStyleSheet, useThemedStyles } from '../../ui/theme/Theme';
import { ThemeContextType } from '../../ui/theme/types';

export const SetListScreen = observer(() => {
	const store = useCardStore();
	const themedStyles = useThemedStyles(styles);

	useEffect(() => {
		store.loadSets();
	}, [store]);

	return (
		<View style={themedStyles.container}>
			<Text>{store.setList.sets.length}</Text>
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
