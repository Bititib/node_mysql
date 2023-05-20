const app = require('../app');
const { NAME_OR_PASSWORD_IS_NOT_NULL, NAME_IS_EXIST, NAME_IS_NOT_EXIST, PASSWORD_IS_INACCRACY, UNAUTHORIZED } = require('../config/error_constants');

app.on('error',(error,ctx)=>{
    let code = 0
    let message = ''

    switch(error){
        case NAME_OR_PASSWORD_IS_NOT_NULL:
            code = -1001
            message = '用户名或者密码不能为空'
            break
        case NAME_IS_EXIST:
            code = -1002
            message = '用户名已存在'
            break    
        case  NAME_IS_NOT_EXIST:
            code = -1003
            message = '用户名不存在'
            break
        case PASSWORD_IS_INACCRACY:
            code = -1003
            message = "密码错误,请重新输入"
            break
        case UNAUTHORIZED:
            code = -1004
            message = '身份令牌token无效'
    }

    ctx.body = { code ,message}
})


