var helpers = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {

  devtool: 'source-map',

  entry: {
    'vendor': './src/vendor-prod.ts',
    'app': './src/main.browser-aot.ts'
  },

  output: {
    path: helpers.root('dist/aot'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  target: 'web',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },

      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },

  plugins: [

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'),
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
//      name: ['app', 'vendor', 'polyfills']
      name: ['app', 'vendor']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new AotPlugin({
      tsConfigPath: './tsconfig-aot.json',
      skipCodeGeneration: false
    }),

    new webpack.NoEmitOnErrorsPlugin(),

/*    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    }),*/

    new ExtractTextPlugin('[name].[hash].css'),

    new CopyWebpackPlugin([{ from: './public/assets', to: './assets' }]),
    new CopyWebpackPlugin([{ from: './public/params', to: './params' }]),
    new CopyWebpackPlugin([{ from: './public/data', to: './data' }]),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    })
    
  ],


};
