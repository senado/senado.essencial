var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'
module.exports = {

  entry: {
    // essencial: './src/js/essencial',
    vendors: ['expose-loader?jQuery!jquery', 'bootstrap']
  },

  externals: {
    jquery: 'jQuery'
  },

  output: {
    path: path.resolve('./build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.json', '.less'],
    alias: {
      deAaZdata: 'deaaz/app/modules/data.yaml'
    }
  },

  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: [
        'file-loader?name=[name].css',
        'extract-loader',
        'css-loader?sourceMap',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [
              autoprefixer({ browsers: 'last 2 versions' })
            ]
          }
        },
        'less-loader?sourceMap'
      ]
    }, {
      test: /[.](svg|woff|ttf|eot|woff2)([?].*)?$/i,
      loader: 'file-loader?name=./fonts/[name].[ext]?v=[hash:base64:5]'
    }, {
      test: /[.](pug|jade)$/, loader: 'pug-loader'
    }, {
      test: /[.]yaml$/, loaders: ['json-loader', 'yaml-loader']
    }]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlPlugin({
      template: './src/fat.pug',
      excludeChunks: ['thin'],
      filename: 'fat.html'
    }),
    new HtmlPlugin({
      template: './src/thin.pug',
      excludeChunks: ['fat'],
      filename: 'thin.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/js/analytics.js' }
    ])
  ],

  stats: { colors: true },

  devtool: ENV === 'production' ? undefined : 'source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true
  }
}
