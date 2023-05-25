const koaRouter = require('@koa/router');
const { create, getUserAvatar } = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');
// 创建路由
const useRouter = new koaRouter({prefix:'/user'});

// 定义路由中间键处理操作映射
// 注册用户
useRouter.post('/',verifyUser,handlePassword,create);

useRouter.get('/avatar/:user_id',getUserAvatar)
module.exports = useRouter