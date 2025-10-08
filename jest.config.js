export const preset = 'jest-expo';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json'];
export const transform = {
  '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
};
export const testMatch = [
  '**/__tests__/**/*.(ts|tsx|js|jsx)',
  '**/*.(test|spec).(ts|tsx|js|jsx)'
];
export const transformIgnorePatterns = [
  "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@reduxjs/toolkit|react-redux|expo(nent)?|expo-modules-core|expo-constants|expo-linking|immer|unimodules|@expo|\\.svg$': '<rootDir>/__mocks__/svgMock.js)/"
];
