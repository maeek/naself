const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { EsbuildPlugin } = require('esbuild-loader');
const tsConfig = require('../tsconfig.json');

const resolveTsConfigPathsToAlias = (compilerOptions) => {
  const { paths } = compilerOptions;
  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = path.resolve(__dirname, paths[ item ][ 0 ].replace('/*', '').replace('*', ''));
    aliases[ key ] = value;
  });

  return aliases;
};

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    publicPath: ''
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jpe?g|png|gif$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[contenthash][ext]' }
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [ '@svgr/webpack' ]
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
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
              }
            }
          }
        ]
      },
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2015'
        }
      }
      // {
      //   test: /\.(ts|js)x?$/i,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         [ '@babel/preset-env', {
      //           targets: {
      //             browsers: 'last 2 versions'
      //           },
      //           modules: false,
      //           loose: false
      //         } ],
      //         [ '@babel/preset-react', { runtime: 'automatic' } ],
      //         '@babel/preset-typescript'
      //       ]
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    alias: resolveTsConfigPathsToAlias(tsConfig.compilerOptions)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015'  // Syntax to transpile to (see options below for possible values)
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules[\\/](react|react-dom|dayjs|react-router-dom|@reduxjs\/toolkit)/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  }
};
