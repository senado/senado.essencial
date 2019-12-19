var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'
module.exports = {

  entry: {
    essencial: './src/js/essencial',
    thin: './src/styles/thin.less',
    fat: './src/styles/fat.less'
  },

  externals: {
    jquery: 'jQuery'
  },

  output: {
    path: path.resolve('./build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.json', '.less']
  },

  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?sourceMap',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [
              autoprefixer()
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
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.NoEmitOnErrorsPlugin(),
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
      { from: 'src/js/analytics.prod.js' },
      { from: 'src/assets/*', to: 'assets', flatten: true },
      { from: 'src/img/*', to: 'img', flatten: true }
    ]),
    new IgnoreEmitPlugin(/(fat|thin).js$/)
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          output: { comments: /senado.essencial/ }
        }
      })
    ]
  },

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
