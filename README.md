## Z-BLOG,我的博客！

### 项目运行

* 项目运行之前，请确保系统已经安装以下应用
```
1、node (6.0 及以上版本)
2、mongodb (开启状态)
```

```
git clone https://github.com/zzl7/z-blog.git  

```
* 启动前台
```
cd z-blog/front

npm i

npm start
```

* 访问前台: http://localhost:8888

* 启动后台

```
cd z-blog/backend

npm i

node index.js
```

* 访问后台: http://localhost:3000 可以看到后台的接口


### 暂定功能

- [x] 文章的增加/删除/点赞/评论 -- 完成
- [x] 支持markdown -- 完成
- [x] 文章点赞数排名/最近更新 -- 完成
- [x] 用户注册/登录 -- 完成
- [x] 搜索文章 -- 未完成
- [x] 上传图片 -- 未完成
- [x] 摄影 -- 未完成
- [x] 旅游 -- 未完成



```
技术栈：Express + MongoDB + react + antd + less + es6

```

### 项目架构

```
.
├── backend
│   ├── common
│   │   └── util.js
│   ├── config.json //数据库和网站端口配置
│   ├── controller //处理数据
│   │   ├── blog.js
│   │   └── user.js
│   ├── index.js //入口文件
│   ├── models //数据库模型
│   │   ├── blog.js
│   │   └── user.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes //后端路由
│   │   ├── blog.js
│   │   └── user.js
│   └── swagger //后台API调试
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── index.html
│       ├── oauth2-redirect.html
│       ├── swagger-ui-bundle.js
│       ├── swagger-ui-bundle.js.map
│       ├── swagger-ui.css
│       ├── swagger-ui.css.map
│       ├── swagger-ui.js
│       ├── swagger-ui.js.map
│       ├── swagger-ui-standalone-preset.js
│       ├── swagger-ui-standalone-preset.js.map
│       └── swagger.yml
├── front
│   ├── dist //打包文件
│   │   ├── css
│   │   ├── index.html
│   │   └── js
│   ├── index.html
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── ps
│   ├── src
│   │   ├── components
│   │   ├── images
│   │   ├── index.jsx
│   │   ├── models
│   │   ├── pages
│   │   └── styles
│   ├── webpack
│   │   ├── webpack.common.js
│   │   ├── webpack.dev.js
│   │   └── webpack.prod.js
│   └── webpack.config.js
├── package-lock.json
└── README.md
```