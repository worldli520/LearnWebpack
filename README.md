# LearnWebpack #

This is a project to record learning webpack
* * *

#### 1.初始化项目

新建文件夹，使用`npm init -y`进行初始化
安装webpack和webpack-cli`npm install webpack webpack-cli -D`

新建`src/index.js`文件，写一个构造韩式并实例化一个对象：

```javascript
class Animal{
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
const cat = new Animal('cat')
```

使用`npx webpack --mode=development`进行构建，由于默认配置是`production`模式，为了方便查看构建后的代码，这里使用`development`模式。

现在根目录下多出一个`dist`目录，其中包含打包好的`main.js`文件。

> 注意：`webpack`默认配置文件入口是`./src`，默认打包的输出文件是`dist/main.js`

查看`dist/main.js`文件会发现，代码并未被转义为低版本的代码。

#### 2.将JS转义为低版本

先安装`babel-loader`:`npm install babel-loader -save`

此外还需要配置`babel`，安装以下依赖：

```javascript
npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime
npm install @babel/runtime @babel/runtime-corejs3
```

此时新建`webpack.config.js`：

```javascript
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      }
    ]
  }
}
```

建议给 `loader` 指定 `include` 或是 `exclude`，指定其中一个即可，因为 `node_modules` 目录通常不需要我们去编译，排除后，有效提升编译效率。

##### 配置babel

> 在`.babelrc`或者`webpack.config.js`两个文件中均可配

```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
现在，我们重新执行 `npx webpack --mode=development`，查看 `dist/main.js`，会发现已经被编译成了低版本的JS代码。

##### 在webpack中配置 babel

```javascript
module.exports = {
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
  }
}
```

> 注意事项：
>
> + `loader`需要在`module.rules`中配置，`rules`为数组。
>
> + `loader`的格式如下：
>
>   ```javascript
>   {
>     test: /\.jsx?$/,//匹配规则
>     use: 'babel-loader'
>   }
>   ```
>
>   只有一个`loader`时也可以向下面这样：
>
>   ```javascript
>   {
>       test: /\.jsx?$/,
>       loader: 'babel-loader',
>       options: {
>           //...
>       }
>   }
>   ```

#### 3.将打包时的mode配置到`webpack.config.js`

我们在使用 `webpack` 进行打包的时候，一直运行的都是 `npx webpack --mode=development`,

可以将`mode`配置到`webpack.config.js`中：

```javascript
module.exports = {
  mode: "development",
  module: {
    ////.....
  }
}
```

现在就可以直接使用`npx webpack`直接进行编译。

#### 4.浏览器查看

在我们平时使用打包时，一般都会带上`hash`，相应的html文件需要重新修改引入js文件的名称，现在我们就可以使用`html-webpack-plugin`来自动修改这些。

```
npm install html-webpack-plugin --save -D
```

在根目录新建`public`目录，新建`index.html`文件

修改`webpack-config.js`:

```
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入插件
module.exports = {
  mode: "development",//配置打包的模式
  module: {
    //.....
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',//源文件地址
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      // hash: true //是否加上hash，默认是 false
    })
  ]
}
```

再次执行`npx webpack`,