const { PERMISSION_NOT_AUTH } = require("../config/error_constants")
const { queryId } = require("../service/moment.service")
const momentService = require("../service/moment.service")

class MomentContorller {
    async createMoment(ctx,next){
        const result = ctx.moment
        if(!result){
            return ctx.body = {
                code:-2,
                message:"发表动态失败"
            }
        }
        ctx.body = {
            code:0,
            message:'发表动态成功'
        }
    }
    
    async list(ctx,next){
        // 获取offset/size
        const { offset , size } = ctx.query

        // 从数据库中查询动态数据
        const result = await momentService.queryList(offset,size)
        ctx.body = {
            code:0,
            message:"获取数据成功",
            data:result
        }
    }

    async detail(ctx,next){
        const { id } = ctx.params
        const result = await momentService.queryId(id)

        ctx.body = {
            code:2,
            data:result,
            message:"OK"
        }
    }

    async deleter(ctx,next){
        const {moment_id} = ctx.params

        const result = await momentService.deleteID(moment_id)
        if(!result) return ctx.app.emit('error',PERMISSION_NOT_AUTH,ctx)
        ctx.body = {
            code:2,
            message:"删除成功",
            data:result
        }
    }

    async updata(ctx,next){
        // 要修改的id 和 内容
        const { moment_id } = ctx.params
        const { content } = ctx.request.body
        const result = await momentService.updataId(content,moment_id)
        ctx.body = {
            code:2,
            data:result,
            message:"修改成功"
        }
    }
}

module.exports = new MomentContorller()