const jwt = require("jsonwebtoken")
const { privateKey } = require("../config/sercet")

class LoginController{
    sign(ctx,next){ 
        // 获取用户信息
        const {id,usename} = ctx.user
       
        // 颁发身份令牌,token认证
        const token = jwt.sign({id,usename},privateKey,{
            expiresIn: 24 * 60 * 60 ,
            algorithm:'RS256'
        })

        // 返回用户数据
        ctx.body = { code:0, data:{ token, id, usename}, message:'登陆成功' }
    }

    test(ctx,next){
        const { id,usename} = ctx.user
         // 返回信息
         ctx.body = {
            code:1001,
            data:{
                id,
                usename,
            },
            message:'可以使用接口'
        }
       
    }
}

module.exports = new LoginController()