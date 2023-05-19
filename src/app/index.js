const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRouter = require('../router/user.route');
// 创建app
const app = new koa();

// 使用中间件
app.use(bodyParser())
app.use(useRouter.routes()).use(useRouter.allowedMethods());

// 导出组件
module.exports = app