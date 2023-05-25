const labelService = require("../service/label.service")
class labelContorller {
    
    async createlabel(ctx,next){
        // 获取数据
        const { name } = ctx.request.body
        const result = await labelService.createContent(name)
        ctx.body = {
            code:0,
            data:result,
            message:'标签添加成功'
        }
    }

    async labelList(ctx,next){
        const {offset,size} = ctx.query
        const result = await labelService.getLabelList(offset,size)

        ctx.body = {
            code:0,
            data:result,
            message:'标签列表'
        }
    }
}

module.exports = new labelContorller()