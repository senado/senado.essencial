var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'

const lessOptions = {
  modifyVars: {
    'bootstrap-path': '"~bootstrap/less"',
    'senadocss-path': '"~senado.css/less"',
    sourceMap: true
  }
  // compress: false
}

module.exports = {

  entry: {
    essencial: './src/js/essencial',
    vendors: ['jquery', 'bootstrap'],
    deAaZdata: 'expose?deAaZdata!deaaz/app/modules/data.yaml'
  },

  externals: {
    deAaZdata: 'deAaZdata'
  },

  output: {
    path: './build',
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.less'],
    modulesDirectories: ['node_modules'],
    alias: {
      deAaZdata: 'deaaz/app/modules/data.yaml'
    }
  },

  module: {
    loaders: [{
      test: /[.](less|css)$/,
      loader: `file?name=[name].css!extract!css?sourceMap!postcss!less?${JSON.stringify(lessOptions)}`
    }, {
      test: /[.](svg|woff|ttf|eot|woff2)([?].*)?$/i,
      loader: 'file-loader?name=./fonts/[name]_[hash:base64:5].[ext]'
    }, {
      test: /[.](pug|jade)$/, loader: 'pug'
    }, {
      test: /[.]yaml$/, loaders: ['json', 'yaml']
    }]
  },

  postcss: [
    autoprefixer({ browsers: 'last 2 versions' })
  ],

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/fat.pug',
      excludeChunks: ['thin'],
      filename: 'fat.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/thin.pug',
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
