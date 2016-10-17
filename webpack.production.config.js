var path = require('path');
var eq = require('lodash/eq');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '/react/index.js'),
    path.join(__dirname, '/assets/sass/index.scss')
  ],
  output: {
      path: path.join(__dirname, '/dist/'),
      filename: "./js/[hash].js",
      publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        loaders: [ 'babel' ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        ),
        loaders: ['style?sourceMap', 'css', 'sass']
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)/,
        loader: 'file-loader?name=fonts/[name]/[name].[ext]'
      }
    ]
  },
  resolve: {
    extentions: [ '', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'react/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('./css/[hash].css'),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new TransferWebpackPlugin([
      { from: 'img', to: 'img'}
    ],
    path.join(__dirname, '/assets')
    ),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, sourcemap: false })

  ]
}