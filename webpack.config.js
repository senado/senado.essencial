var webpack = require('webpack')
var Extractor = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var uncss = require('postcss-uncss')

const ENV = process.env.NODE_ENV || 'development'

module.exports = {

  entry: {
    thin: './src/less/thin',
    fat: './src/less/fat',
    vendors: './src/vendors'
  },

  output: {
    path: './build',
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.less']
  },

  module: {
    loaders: [{
      test: /\.(less|css)$/,
      loader: Extractor.extract('css?sourceMap!postcss!less?sourceMap')
    }, {
      test: /\.(svg|woff|ttf|eot|woff2)(\?.*)?$/i,
      loader: 'file-loader?name=./fonts/[name]_[hash:base64:5].[ext]'
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }]
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 2 versions' }),
    // uncss({ html: ['build/fat.html'] })
  ],

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new Extractor('[name].css', { allChunks: false }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: './src/fat.jade',
      excludeChunks: ['thin'],
      filename: 'fat.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/thin.jade',
      excludeChunks: ['fat'],
      filename: 'thin.html'
    })
  ]).concat(ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ] : []),

  stats: { colors: true },

  devtool: ENV === 'production' ? undefined : 'inline-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true
  }
}
