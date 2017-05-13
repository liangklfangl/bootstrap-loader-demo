const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devBuildConfig = require('./webpack.dev.config');
//得到webpack配置
const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 8080;
const server = express();
const compiler = webpack(devBuildConfig);
//开始打包，添加两个插件webpack-dev-middleware,webpack-hot-middleware
server.use(webpackDevMiddleware(compiler, {
  publicPath: devBuildConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
}));
server.use(webpackHotMiddleware(compiler));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
//发送bootstrap-dev.html到客户端
server.use('/', (req, res) => ( 
  res.sendFile(path.join(__dirname, 'app', 'markup', 'bootstrap-dev.html'))
));

server.listen(PORT, IP, err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(`=> 🔥  Webpack dev server is running on port ${PORT}`);
});
