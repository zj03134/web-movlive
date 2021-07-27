# 百度头条项目

### 项目介绍

- 百度头条移动端是一个IT资讯移动web应用，有着和**今日头条**类似的资讯浏览体验。
- 主要功能：资讯列表、标签页切换，文章举报，频道管理、文章详情、关注功能、点赞功能、评论功能、搜索功能、登录功能、个人中心、编辑资料、小思同学
- 百度头条可打包成一款移动APP，后期结合H5+可在Dcloud打包成一款体验较好的手机应用。
- 项目在线浏览地址: http://123.57.109.30:4005/dist/

### 基础包名

| 包名             | 概念           |
| :--------------- | -------------- |
| vuejs            | 核心vue        |
| vuex             | 状态管理插件   |
| vue-router       | 路由管理插件   |
| axios            | 网络请求插件   |
| vant             | 移动组件库     |
| socket.io-client | 即时通讯库     |
| amfe-flexible    | flexiblejs适配 |

### 生产环境的包名

| 包名            | 概念                                 |
| --------------- | ------------------------------------ |
| babel           | ES语法转换器                         |
| less            | css预处理器                          |
| vue-cli         | vue项目脚手架包                      |
| postcss         | css语法转换器(后处理器)              |
| postcss-pxtorem | 把px自动转rem插件(需要配合webpack用) |

### 目录结构

```sh
├── node_modules # 安装的包
├── public	# 静态资源托管目录
│   ├── favicon.ico
│   └── index.html
└── src	# 源码
    ├── api	#请求接口封装模块
    	└── index.js #封装请求方法
    ├── assets	#资源目录
    ├── components	#组件目录
    ├── router	#路由模块
    	└── index.js #路由对象
    ├── store	#Vuex容器模块
    	└── index.js #store对象
    ├── styles #样式目录
    ├── utils  #工具模块目录
    ├── views  #视图组件目录
    ├── App.vue	#根组件
    └── main.js	#入口文件
├── .browserslistrc # 浏览器的约定
├── .editorconfig #对本项目要用到编辑器的约定
├── .eslintrc.js #eslint
├── .gitignore # git的忽略设置
├── babel.config.js	#babel配置文件
├── package-lock.json	#npm相关文件
├── package.json	#npm相关文件
└── README.md	#项目说明文件
```



### 项目设置下载

```
yarn install
```

### 运行项目
```
yarn serve
```

### 压缩文件和编译
```
yarn build
```

### Lints和fixes文件
```
yarn lint
```

### 自定义配置
请参阅[配置参考](https://cli.vuejs.org/config/).

