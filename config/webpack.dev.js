const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const jsFolder = 'public/js/';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `${jsFolder}[name].[hash:8].bundle.js`,
    chunkFilename: `${jsFolder}[name].[hash:8].bundle.js`,
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: path.resolve('dist'),
    compress: true,
    port: 4200
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss?$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
