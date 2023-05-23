const { NAME_OR_PASSWORD_IS_NOT_NULL, NAME_IS_NOT_EXIST, PASSWORD_IS_INACCRACY,UNAUTHORIZED } = require("../config/error_constants")
const { md5Password } = require("../utils/md5_password")
const { publicKey } = require("../config/sercet")
const userService = require("../service/user.service")

const jwt = require("jsonwebtoken")

// 用户注册
const verifyLogin = async (ctx,next)=>{
    // 获取登录的数据
    const { usename,password } = ctx.request.body
    // 判断用户名和密码是否为空
    if(!usename || !password){
        return ctx.app.emit('error',NAME_OR_PASSWORD_IS_NOT_NULL,ctx)
    }

    // 查询该用户是否存在数据库中
    const users = await userService.query(usename)
    const user = users[0]
    if(!user){
        return ctx.app.emit('error',NAME_IS_NOT_EXIST,ctx)
    }

    // 查询数据库中的密码与用户登录的密码是否一致
    if(user.password !== md5Password(password)){
        return ctx.app.emit('error',PASSWORD_IS_INACCRACY,ctx)
    }

    // 通过ctx共享查询到的用户信息,将user存储到ctx中
    ctx.user = user

    await next()
}
// 用户鉴权
const verifyUserAuth = async (ctx,next)=>{
    // 判断用户返回的数据
    const authorization = ctx.headers.authorization

    if(!authorization){
        return ctx.app.emit('error',UNAUTHORIZED,ctx)
    }

    const token = authorization.replace('Bearer ','')

    try {
        const result = jwt.verify(token,publicKey,{algorithms:['RS256']})
        ctx.user = result
        
       await next()

    } catch (error) {
        ctx.app.emit('error',UNAUTHORIZED,ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyUserAuth
}
