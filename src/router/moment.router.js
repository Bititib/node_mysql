const koaRouter = require('@koa/router')
const { createMoment, list, detail, updata, deleter } = require('../controller/moment.controller')
const { verifyUserAuth} = require('../middleware/login.middleware')
const { PublicMoment } = require('../middleware/moment.middleware')
const { verifyPermission} = require('../middleware/permission.middleware')
const momentRouter = new koaRouter({prefix:'/moment'})

// 1、发表动态
momentRouter.post('/',verifyUserAuth,PublicMoment,createMoment);
// 2、获取动态
momentRouter.get('/',list)
momentRouter.get('/:id',detail)
// 3、删除动态
momentRouter.delete('/:moment_id',verifyUserAuth,verifyPermission,deleter)

// 4、修改动态
momentRouter.patch('/:moment_id',verifyUserAuth,verifyPermission,updata)

module.exports = momentRouter