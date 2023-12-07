const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    require('postcss-import'),
    autoprefixer,
    cssnano({
      discardComments: { removeAll: true },
      discardUnused: true,
      mergeIdents: true,
      reduceIndents: true,
      safe: true,
      sourcemap: true
    })
  ]
};
