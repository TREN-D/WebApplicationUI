const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const jsFolder = 'public/js/';
const cssFolder = 'public/css/';
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: `${jsFolder}[name].[contenthash:8].bundle.js`,
    chunkFilename: `${jsFolder}[name].[contenthash:8].bundle.js`
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: `${cssFolder}[id].[contenthash:8].css`,
      chunkFilename: `${cssFolder}[id].[contenthash:8].css`
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
