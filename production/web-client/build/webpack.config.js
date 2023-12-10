/* eslint-disable node/no-unpublished-require */
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const { EsbuildPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const tsConfig = require('../tsconfig.json');

const resolveTsConfigPathsToAlias = compilerOptions => {
  const { paths } = compilerOptions;
  const aliases = {};

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '');
    const value = path.resolve(__dirname, '..', paths[item][0].replace('/*', '').replace('*', ''));
    aliases[key] = value;
  });

  return aliases;
};

const isDevelopment = process.env.NODE_ENV !== 'production';

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main.tsx',
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
        use: ['@svgr/webpack']
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
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
          },
          'sass-loader'
        ]
      },
      !isDevelopment && {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'
        }
      },
      isDevelopment && {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: 'last 2 versions'
                  },
                  modules: false,
                  loose: false
                }
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ].filter(Boolean)
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: resolveTsConfigPathsToAlias(tsConfig.compilerOptions)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new EsbuildPlugin({
      define: {
        'process.env': JSON.stringify(process.env)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  optimization: {
    minimize: !isDevelopment,
    usedExports: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        minify: true,
        treeShaking: true,
        css: true
      })
    ],
    runtimeChunk: isDevelopment ? 'single' : undefined,
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
  },
  devServer: {
    port: 3000,
    hot: isDevelopment,
    server: 'spdy'
  }
};
