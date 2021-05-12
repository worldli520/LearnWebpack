const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",//配置打包的模式
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "corejs": 3
                  }
                ]
              ]
          }
        },
        exclude: /node_modules/ //排除 node_modules 目录
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',//源文件地址
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      hash: true //是否加上hash，默认是 false
    })
  ]
}