const userService = require("../service/user.service")


class Controller {
    async create(ctx,next){
        // 1、获取用户传递过来的数据
        const user = ctx.request.body
        
        // 2、将用户数据存储到数据库
        const result = await userService.create(user)

        // 3、查看数据库的结果，创建成功告知前端返回结果
    
       ctx.body = {
            code:200,
            data:result,
            meg:'用户创建成功'
       }
    
    }
}



module.exports = new Controller()