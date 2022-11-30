const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'react-native',
	projects: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	transform: {
		'^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
		'\\.(ts|tsx)$': 'ts-jest'
	},
	testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
	cacheDirectory: '.jest/cache',
	testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
	moduleNameMapper: {
		'\\.svg': '<rootDir>/jest/svgMock.js'
	},
	setupFiles: ['<rootDir>/jest/jestSetup.js'],
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-reanimated|@react-navigation)/)'
	]
};
