const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const fs = require("fs")
const { AVATAR_UPLOADS_PATH } = require("../config/path")

class userController {
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

    async getUserAvatar(ctx,next){
        // 1 获取对应的user id
        const {user_id} = ctx.params

        // 2 获取对应的avatar
        const result = await fileService.queryUserAvatar(user_id)

        // 3 读取头像所在文件
        const { filename,mimetype } = result;
        ctx.type = mimetype;
        ctx.body = fs.createReadStream(`${AVATAR_UPLOADS_PATH}/${filename}`)
    }
  
}



module.exports = new userController()