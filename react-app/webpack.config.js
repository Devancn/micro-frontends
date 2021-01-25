// import {Configuration} from 'webpack'
const htmlWebpackPlugin = require('html-webpack-plugin');

 /**
  * @type Configuration
  */
 const config = {
  mode: 'development',
  entry: './index.js',
  output: {
    library: 'react',
    libraryTarget: 'umd'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 30001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback : true
  },
  module: {
    rules:  [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    })
  ]
 }

 module.exports = config;