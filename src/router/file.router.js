const koaRouter = require('@koa/router')
const { createFile } = require('../controller/file.controller')
const { uploadeFile} = require('../middleware/file.middleware')
const { verifyUserAuth } = require('../middleware/login.middleware')
const fileRouter = new koaRouter({prefix:'/file'})



fileRouter.post('/',verifyUserAuth,uploadeFile,createFile)

module.exports = fileRouter