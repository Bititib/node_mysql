const koaRouter = require('@koa/router')
const { createlabel, labelList } = require('../controller/label.controller')
const { verifyUserAuth } = require('../middleware/login.middleware')
const labelRouter = new koaRouter({prefix:'/label'})

labelRouter.post('/',verifyUserAuth,createlabel)
labelRouter.get('/list',labelList)

module.exports = labelRouter