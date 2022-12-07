import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CardSet } from '../../store/Store';
import { useCardStore } from '../../store/StoreProvider';
import { Separator } from '../../ui/Separator/Separator';
import { ThemedStyleSheet, useThemedStyles } from '../../ui/theme/Theme';
import { ThemeContextType } from '../../ui/theme/types';
import { SvgUri } from 'react-native-svg';

export const SetListScreen = observer(() => {
	const store = useCardStore();
	const themedStyles = useThemedStyles(styles);
	const [visibleItems, setVisibleItems] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		store.loadSets();
	}, [store]);

	return (
		<SafeAreaView edges={['left', 'right']}>
			<View style={themedStyles.container}>
				<Text>{`Showing sets ${visibleItems[0] + 1} to ${visibleItems[1] + 1} out of ${
					store.setList.setCount
				}`}</Text>
				<FlashList
					data={[...store.setList.setsByDate]}
					renderItem={RenderSetListItem}
					estimatedItemSize={100}
					onRefresh={store.loadSets}
					ItemSeparatorComponent={Separator}
					refreshing={store.setList.isLoading}
					onViewableItemsChanged={({ viewableItems }) => {
						if (viewableItems.length > 1) {
							setVisibleItems([
								viewableItems[0].index ?? 0,
								viewableItems[viewableItems.length - 1].index ?? 0
							]);
						}
					}}
				/>
			</View>
		</SafeAreaView>
	);
});

const RenderSetListItem = ({ item }: { item: CardSet }): JSX.Element => {
	return <SetListItem set={item} />;
};

const SetListItem = ({ set }: { set: CardSet }): JSX.Element => {
	const themedStyles = useThemedStyles(styles);
	return (
		<View style={themedStyles.setListItemContainer}>
			<View style={themedStyles.setListIconContainer}>
				<SvgUri
					width={themedStyles.setListIcon.width}
					height={themedStyles.setListIcon.height}
					uri={set.iconURL ?? ''}
					fill={themedStyles.setListIcon.fillColor}
				/>
			</View>
			<View style={themedStyles.setListInfoContainer}>
				<Text>{set.name}</Text>
				<Text>{`Release date: ${set.releaseDate}`}</Text>
				<Text>{`${set.cardCount} total cards`}</Text>
			</View>
		</View>
	);
};

const styles = ThemedStyleSheet.create((context: ThemeContextType) => ({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: context.theme.backgroundColor
	},
	loadNextButton: {
		color: context.theme.linkColor
	},
	setListItemContainer: {
		flexDirection: 'row'
	},
	setListIconContainer: {
		padding: 8,
		justifyContent: 'center'
	},
	setListIcon: {
		width: 40,
		height: 40,
		fillColor: context.theme.black
	},
	setListInfoContainer: {
		padding: 8
	}
}));
