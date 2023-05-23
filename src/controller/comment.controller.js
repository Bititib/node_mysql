const commentService = require("../service/comment.service")

class CommentContorller {
    
    async createComment(ctx,next){
       const {id} = ctx.user
       const { content , momentId} = ctx.request.body

       const result = await commentService.createContent(content,id,momentId);
       
       ctx.body = {
            code:0,
            data:result,
            message:"成功评论"
       }
    }

    async replyComment(ctx,next){
       
        const { id } = ctx.user
        const { content,momentId,commentId } = ctx.request.body
        const result = await commentService.replyContent(content,id,momentId,commentId)

        ctx.body = {
            code:0,
            data:result,
            message:"留言成功"
        }
    }
}

module.exports = new CommentContorller()