const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    filename: devMode ? '[name].[hash].bundle.js' : '[name].[contenthash].bundle.js',
    path: path.resolve('./', 'dist')
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve()
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      inject: 'body',
      filename: 'index.html',
      template: './public/template.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].[hash].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].[hash].css' : '[id].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss?$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts'
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss?$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
