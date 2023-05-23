const { PERMISSION_NOT_AUTH } = require("../config/error_constants")
const permissionService = require("../service/permission.service")

// 1、
// const verifyMomentPermission = async (ctx,next) => {
//     // 1、获取登录用户的id 、要修改的动态id
//     const { moment_id } = ctx.params
//     const { id } = ctx.user
//     // 2、查询user的id是否有修改moment的权限
//     const isPermissionAuth = await permissionService.checkMoment(moment_id,id)

//     if(!isPermissionAuth){
//         return ctx.app.emit('error',PERMISSION_NOT_AUTH,ctx)
//     }

//     await next()
// } 

// 2、

const verifyPermission = async (ctx,next) => {
    // 1、获取登录用户的id 、要修改的动态id
    const { id } = ctx.user
    const keyName = Object.keys(ctx.params)[0]
    const resourceId = ctx.params[keyName]
    const resourceName = keyName.replace('_id','')

    // 2、查询user的id是否有修改moment的权限
    const isPermissionAuth = await permissionService.checkResource(resourceName,resourceId,id)

    if(!isPermissionAuth){
        return ctx.app.emit('error',PERMISSION_NOT_AUTH,ctx)
    }

    await next()
} 


module.exports = {
    // verifyMomentPermission,
    verifyPermission
}