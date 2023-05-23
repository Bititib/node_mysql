const koaRouter = require('@koa/router')
const { createComment, replyComment } = require('../controller/comment.controller')
const { verifyUserAuth } = require('../middleware/login.middleware')
const commentRouter = new koaRouter({prefix:'/comment'})

// 留言评论
commentRouter.post('/',verifyUserAuth,createComment)
// 回复留言
commentRouter.post('/reply',verifyUserAuth,replyComment)
module.exports = commentRouter