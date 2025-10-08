module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          root: ['./src'],
          alias: {
            '@': './src'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
