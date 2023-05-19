const app = require('../app');
const { NAME_OR_PASSWORD_IS_NOT_NULL, NAME_IS_EXIST } = require('../config/error_constants');

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
    }

    ctx.body = { code ,message}
})


