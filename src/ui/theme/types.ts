import type { ViewStyle, TextStyle } from 'react-native';

export type Theme = {
	backgroundColor: string;
	linkColor: string;
	black: string;
	red: string;
	green: string;
	yellow: string;
};

export enum ThemeName {
	light = 'light',
	dark = 'dark'
}

export type ThemeContextType = {
	name: ThemeName;
	theme: Theme;
	themedStyle: (style: ThemedStyleParam) => ThemedStyle;
};

export interface ThemeProviderProps {
	theme?: ThemeName;
	children: React.ReactElement | React.ReactElement[];
}

export type ThemedStyle = ViewStyle | TextStyle | string;

export type ThemedStyleParam = {
	[ThemeName.light]: ThemedStyle;
	[ThemeName.dark]: ThemedStyle;
};
