const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
//bootstrap configuration for webpack
console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoints.dev}`);
// { dev: 'bootstrap-loader',
//   prod: 'bootstrap-loader/extractStyles'
//    }
//This is default  
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'tether',
    //https://github.com/HubSpot/tether
    //http://tether.io/
    'font-awesome-loader',
    bootstrapEntryPoints.dev,
    //将bootstrap的配置添加到webpack的entry中
    './app/scripts/app',
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },

  devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: ['*', '.js'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //Do not forget in bootstrap version 4
    //You can use expose-loader+ProviderPlugin to expose global variables
    new webpack.ProvidePlugin({
       $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      // Bootstrap 4
       { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' }
      // Bootstrap 3
      // { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
    ],
  },

};
