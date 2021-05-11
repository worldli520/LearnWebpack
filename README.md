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

先安装`babel-loader`:`npm install babel-loader -D`

此外还需要配置`babel`，安装以下依赖：

```javascript
npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
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
