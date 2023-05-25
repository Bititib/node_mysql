const { SERVER_HOST, SERVER_PROT } = require("../config/server");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");

class FileContorller {
    async createFile(ctx,next){
        // 1 获取文件信息、用户信息
        const {filename,mimetype,size} = ctx.request.file;
        const {id} = ctx.user
        // 2 存储文件
        const result = await fileService.createContent(filename,mimetype,size,id)
        // 3 存储文件地址

        const avatarUrl = `${SERVER_HOST}:${SERVER_PROT}/user/avatar/${id}`
        const saveAvatarUrl = await userService.updateUserAvatar(avatarUrl,id);

        ctx.body = {
            code:0,
            message:"上传成功~",
            data:avatarUrl
        }
    }
}   

module.exports = new FileContorller()