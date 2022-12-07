import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const Separator = () => {
	return <View style={styles.separator} />;
};
const styles = StyleSheet.create({
	separator: {
		alignSelf: 'stretch',
		backgroundColor: 'gray',
		height: 1
	}
});
