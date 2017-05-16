const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const build = require("webpackcc/lib/build");
const devBuildConfig = require('./webpack.dev.config');
//得到webpack配置
const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 8080;
const server = express();
const program = {
	config:"./webpack.dev.config.js",
    onlyCf : false,
    //表示会打包的，而且是watch模式
    cwd : process.cwd(),
    watch: 100,
    //监听源文件的文化100ms
    dev : false,
    //启动压缩,此时会添加如uglifyJS等,同时也会使用extract-text-webpack-plugin等抽取css到单独的文件
    hook:function(webpackConfig){
         return webpackConfig;
    }
  };
build(program);


// const compiler = webpack(devBuildConfig);
// //开始打包，添加两个插件webpack-dev-middleware,webpack-hot-middleware
// // server.use(webpackDevMiddleware(compiler, {
// //   publicPath: devBuildConfig.output.publicPath,
// //   hot: true,
// //   historyApiFallback: true,
// //   stats: {
// //     colors: true,
// //     hash: false,
// //     version: false,
// //     chunks: false,
// //     children: false,
// //   },
// // }));
// // server.use(webpackHotMiddleware(compiler));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
// //发送bootstrap-dev.html到客户端
// server.use('/', (req, res) => ( 
//   res.sendFile(path.join(__dirname, 'app', 'markup', 'bootstrap-prod.html'))
// ));

// server.listen(PORT, IP, err => {
//   if (err) console.log(`=> OMG!!! 🙀 ${err}`);
//   console.log(`=> 🔥  Webpack dev server is running on port ${PORT}`);
// });
