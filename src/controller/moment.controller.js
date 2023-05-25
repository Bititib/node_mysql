const { PERMISSION_NOT_AUTH } = require("../config/error_constants")
const momentService = require("../service/moment.service")
const MomentLabelService = require("../service/moment_label.service")

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
        if(!result.length) return ctx.body = {code:2,message:'没有该评论'}
        ctx.body = {
            code:0,
            message:"获取数据成功",
            data:result
        }
    }

    async detail(ctx,next){
        const { id } = ctx.params
        const result = await momentService.queryId(id)
        if(!result.length) return ctx.body = {code:2,message:'没有该评论'}
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

    // 为动态添加标签
    async addLabels(ctx,next){
        const {moment_id} = ctx.params
        const labels = ctx.labels
        try {
            
            for(const label of labels){
                const isExists = await MomentLabelService.queryML(moment_id,label.id);
                if(isExists) continue
                const resulter = await MomentLabelService.InsertML(moment_id,label.id)
            }
            ctx.body = {
                code:0,
                message:"添加成功~",
            }

        } catch (error) {
            ctx.body = {
                code:-200,
                message:"添加失败~"
            }
        }
    }
}

module.exports = new MomentContorller()