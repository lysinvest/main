var helpers = require('./helpers');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  devtool: 'source-map',

  entry: helpers.root('./src/main.server-aot.ts'),

  output: {
    path: helpers.root('dist/aot'),
    filename: 'server.js',
//    chunkFilename: '[id].bundle.js',
    chunkFilename: '[id].[hash].bundle.js',
    crossOriginLoading: false
  },

  target: 'node',

  resolve: {
    extensions: ['.ts', '.js']
    //    extensions: ['.ts', '.js', '.json']
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
    ]
  },

  plugins: [

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'),
      {}
    ),

//    new ExtractTextPlugin('bundle.css'),
    new ExtractTextPlugin('bundle.[hash].css'),

    new AotPlugin({
      tsConfigPath: './tsconfig.server-aot.json',
      skipCodeGeneration: false
    }),

  ],
};