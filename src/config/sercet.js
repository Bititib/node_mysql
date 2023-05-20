const fs = require('fs')
const path = require('path')

// 默认情况下相对目录和node程序的启动目录有关
// 使用相对路径的话从src目录开始  or 使用绝对路径

const privateKey = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const publicKey = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));


module.exports = {
    privateKey,publicKey
}