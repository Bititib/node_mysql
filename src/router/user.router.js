const koaRouter = require('@koa/router');
const userController = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
// 创建路由
const useRouter = new koaRouter({prefix:'/user'});

// 定义路由中间键处理操作映射
useRouter.post('/',verifyUser,handlePassword,userController.create);


module.exports = useRouter