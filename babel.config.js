const babelResolvePath = require('babel-plugin-module-resolver').resolvePath;
const fs = require('fs');
const path = require('path');

/**
 * Method for replacement of dev.config
 * @param {String} sourcePath import path from currentFile e.g `App`
 * @param {String} currentFile absolute path to the file where was `import` statements
 * @param {Object} opts object that contain resolvePath method
 */
function resolvePath(sourcePath, currentFile, opts) {
  let resultPath = babelResolvePath.apply(this, arguments);

  if (
    process.env.BABEL_ENV === 'development' &&
    resultPath &&
    resultPath.includes('dev.config.empty')
  ) {
    const devConfigPath = resultPath.replace('dev.config.empty', 'dev.config');
    const absDevConfigPath =
      path.resolve(path.dirname(currentFile), devConfigPath) + '.ts';

    if (fs.existsSync(absDevConfigPath)) {
      return devConfigPath;
    }
  }

  // Return original resolvePath for all other files
  return resultPath;
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.js', '.json', '.svg', '.png'],
          alias: {
            fonts: './app/global/fonts',
            components: './app/components',
            store: './app/store',
            actions: './app/actions',
          },
          resolvePath,
        },
      ],
    ],
  };
};
