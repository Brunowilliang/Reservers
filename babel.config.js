module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@styles': './src/styles',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@routes': './src/routes',
            '@utils': './src/utils',
          }
        },
      ],
    ],
  };
}; 
