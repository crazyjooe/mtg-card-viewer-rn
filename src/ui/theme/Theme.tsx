import * as React from 'react';
import { useColorScheme } from 'react-native';
import type { ThemeContextType, ThemeProviderProps, ThemedStyle, ThemedStyleParam } from './types';
import { ThemeName } from './types';
import LightTheme from './themes/light';
import DarkTheme from './themes/dark';

const DEFAULT_THEME = ThemeName.light;
const THEMES = { light: LightTheme, dark: DarkTheme };

const createThemeContext = (themeName = DEFAULT_THEME): ThemeContextType => {
	return {
		name: themeName,
		theme: THEMES[themeName],
		themedStyle: (style: ThemedStyleParam) => getThemedStyle(style, themeName)
	};
};

export const ThemeContext = React.createContext(createThemeContext());

export const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
	const colorScheme = useColorScheme();
	const value = React.useMemo(
		() => createThemeContext(getSupportedThemeName(props.theme ?? colorScheme)),
		[props.theme, colorScheme]
	);

	return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
	const theme = React.useContext(ThemeContext);

	return theme;
};

export const useThemedStyles = <T extends ThemedStyleSheet.ThemedStyles<T> | ThemedStyleSheet.ThemedStyles<any>>(
	styles: (context: ThemeContextType) => T
): T => {
	const context = useTheme();
	return ThemedStyleSheet.themedStyles(context, styles);
};

export namespace ThemedStyleSheet {
	export type ThemedStyles<T> = { [P in keyof T]: ThemedStyle };

	export const themedStyles = <T extends ThemedStyles<T> | ThemedStyles<any>>(
		themeContext: ThemeContextType,
		styles: (context: ThemeContextType) => T
	): T => {
		return styles(themeContext);
	};

	export const create = <T extends ThemedStyles<T> | ThemedStyles<any>>(
		styles: (context: ThemeContextType) => T
	): ((context: ThemeContextType) => T) => {
		return (context: ThemeContextType) => styles(context);
	};
}

const getThemedStyle = (style: ThemedStyleParam, themeName: ThemeName): ThemedStyle => {
	if (typeof style === 'string') {
		return style;
	}

	return style[themeName];
};

const getSupportedThemeName = (themeName: string | undefined | null): ThemeName => {
	if (!themeName) {
		return DEFAULT_THEME;
	}

	if (themeName in ThemeName) {
		return themeName as ThemeName;
	}

	return DEFAULT_THEME;
};
