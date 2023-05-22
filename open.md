## 开发文档

### src目录
src-
    | -> app : 搭建服务目录
    | -> config : 配置文件目录
    | -> controller : 条件控制目录
    | -> middleware : 文件中间件目录
    | -> router : 路由文件目录
    | -> service : 数据收集服务目录
    | -> utils : 集成处理目录
    | -> main.js : 服务启动文件


### 自动化注册对应的路由
```js
const fs = require('fs')

function registerRouters(app) {
    // 读取当前目录下的所有文件
    const files = fs.readdirSync(__dirname)
    console.log(files)
    // 便利所有的文件
    for (const file of files) {
        if(!file.endsWith('.router.js')) continue
        const router = require(`./${file}`)
        app.use(router.routes()).use(router.allowedMethods())
    }

}

module.exports = registerRouters
```

### 发表动态接口 moment

> 已完成动态内容存储在数据库中


### 