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


### 权限认证
> permission.middleware.js
```js
    const verifyMomentPermission = async (ctx,next) =>{
        // 1、需要获取登录用户的id和修改动态的id
        const { momentid } = ctx.params
        const { id } = ctx.user

        // 2、查询user的id是否有权限修改moment的id
        const ispermissionAuth = await permissionSerivce.checkMonment(momentid,id)
        if(!ispermissionAuth){
            return error
        }
        
        await next()
 }
```

### 完成动态的增删改查
> ./src/router/moment.router.js

### 创建动态留言功能接口
> ./src/router/comment.router.js

### 标签接口开发
> ./src/router/label.rputer.js

### 用户头像上传 
> ./src/router/file.router.js
- 定义上传头像的接口

- 定义获取图像的接口

- 请求用户时，获取头像

> 获取图片的信息,建立一张存储图片信息的表以及和用户的关系,
> 图片存储的地址如何存储,以可读流的方式返回图片
>

`重点:` 
创建用户时应该保证用户名不存在,才可创建;
校验身份是否具有可操作性;
私钥和公钥的生成