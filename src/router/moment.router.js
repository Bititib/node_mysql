const koaRouter = require('@koa/router')
const { createMoment, list, detail, updata, deleter, addLabels } = require('../controller/moment.controller')
const { verifyLabelEexit } = require('../middleware/label.midddleware')
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

// 动态添加labels
// 1、验证是否登录
// 2、验证是否有操作权限
// 3、验证label的name是否存在label表中
// 4、所有的label都已在label表中
momentRouter.post('/:moment_id/labels',verifyUserAuth,verifyPermission,verifyLabelEexit,addLabels)




module.exports = momentRouter