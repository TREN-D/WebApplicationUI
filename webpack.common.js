const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.npm_lifecycle_event !== 'build';
module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //  {
    //  root: path.resolve()
    //  }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/assets/images/favicon.ico'
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
        test: /\.(png|svg|jpg|gif)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'public/images',
          publicPath: devMode ? '' : '../images/'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'public/fonts',
          publicPath: devMode ? '' : '../fonts/'
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};
