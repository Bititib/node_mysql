const { NAME_OR_PASSWORD_IS_NOT_NULL, NAME_IS_EXIST } = require("../config/error_constants");
const userService = require("../service/user.service");
const { md5Password } = require("../utils/md5_password");


const verifyUser = async (ctx,next)=>{
    // 1 判断用户是否存在
    const { usename , password} = ctx.request.body;
    if(!usename || !password){
        // ctx.body = {
        //     code:-1,
        //     message:'用户名或密码不能为空',
        // }

        // 注册事件统一处理错误
        return ctx.app.emit('error',NAME_OR_PASSWORD_IS_NOT_NULL,ctx)
    }
    // 2、判断用户是否存在数据库中
    const users = await userService.query(usename);
    if(users.length){
        // ctx.body = {
        //     code:-1002,
        //     message:'用户名已存在'
        // }
        return ctx.app.emit('error',NAME_IS_EXIST,ctx)
    }

    // 执行下一个中间健
    await next()
}
// 密码加密
const handlePassword = async (ctx ,next )=>{
    // 取出密码
    const {password} = ctx.request.body

    // 对密码加密,并且再次赋值到ctx.request.body
    ctx.request.body.password = md5Password(password)
    
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}