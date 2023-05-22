const koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const useRouter = require('../router/user.route');
// const loginRouter = require('../router/login.router');
const registerRouters = require('../router');
// 创建app
const app = new koa();

// 使用中间件
app.use(bodyParser())

// 注册路由
registerRouters(app)
// app.use(useRouter.routes()).use(useRouter.allowedMethods());
// app.use(loginRouter.routes()).use(loginRouter.allowedMethods())

// 导出组件
module.exports = app