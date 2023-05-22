const { createContent } = require("../service/moment.service")

const PublicMoment = async (ctx,next) => {
     // 获取传递过来的内容
     const {content} = ctx.request.body
     const {id} = ctx.user
     // 将内容存储到数据库中
     const result = await createContent(content,id)
     ctx.moment = result

     await next()
}


module.exports = {
    PublicMoment
}