var webpack = require('webpack')
var Extractor = require('extract-text-webpack-plugin')
var Purify = require('purifycss-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')

const ENV = process.env.NODE_ENV || 'development'

module.exports = {

  entry: {
    thin: './thin.less',
    fat: './fat.less'
  },

  output: {
    path: './build',
    publicPath: '/',
    filename: '[name].js'
  },

  externals: {
    jquery: 'jQuery'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less']
  },

  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: Extractor.extract('css?sourceMap!postcss!less?sourceMap')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(xml|html|txt)$/,
        loader: 'raw'
      },
      {
        test: /\.(svg|woff|ttf|eot|woff2)(\?.*)?$/i,
        loader: 'file-loader?name=assets/fonts/[name]_[hash:base64:5].[ext]'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      }
    ]
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 2 versions' })
  ],

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new Extractor('[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: './templates/fat.jade',
      chunks: ['fat'],
      filename: 'fat.html'
    }),
    new HtmlWebpackPlugin({
      template: './templates/thin.jade',
      chunks: ['thin'],
      filename: 'thin.html'
    }),
    new Purify({
      basePath: __dirname,
      resolveExtensions: ['.html'],
      paths: [
        'build/fat.html',
        'build/thin.html'
      ],
      purifyOptions: {
        minify: true
      }
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
