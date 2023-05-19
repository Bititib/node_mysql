// 导入app
const { SERVER_PROT } = require('./config/server');
const app =require('./app/index')
require('./utils/handle_error')




// 启动服务
app.listen(SERVER_PROT,()=>{
    console.log(`本地服务器 ${SERVER_PROT} 端口已启动`)
});