const koaRouter = require('@koa/router')
const { sign, test } = require('../controller/login.controller')
const { verifyLogin , verifyUserAuth} = require('../middleware/login.middleware')

const loginRouter = new koaRouter({prefix:'/login'})

loginRouter.post('/',verifyLogin,sign)
loginRouter.get('/test',verifyUserAuth,test)

module.exports = loginRouter
