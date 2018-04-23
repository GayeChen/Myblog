# Myblog
从零搭建一个node.js博客系统
对应文件及文件夹的用处：

##### 1. 初始化项目以及目录结构
```npm init```
- models: 存放操作数据库的文件
- public: 存放静态文件，如样式、图片等
- routes: 存放路由文件
- views: 存放模板文件
- index.js: 程序主文件
- package.json: 存储项目名、描述、作者、依赖等等信息

##### 2. 安装依赖模块
- 使用yarn安装
```
yarn add config-lite connect-flash connect-mongo pug express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston
```

对应模块的用处：

1. `express`: web 框架
2. `express-session`: session 中间件
3. `connect-mongo`: 将 session 存储于 mongodb，结合 express-session 使用
4. `connect-flash`: 页面通知的中间件，基于 session 实现
5. `pug`: 模板引擎
6. `express-formidable`: 接收表单及文件上传的中间件
7. `config-lite`: 读取配置文件
8. `marked`: markdown 解析
9. `moment`: 时间格式化
10. `mongolass`: mongodb 驱动
11. `objectid-to-timestamp`: 根据 ObjectId 生成时间戳
12. `sha1`: sha1 加密，用于密码加密
13. `winston`: 日志
14. `express-winston`: express 的 winston 日志中间件


##### 3. 页面
- 注册

