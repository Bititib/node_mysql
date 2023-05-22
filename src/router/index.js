const fs = require('fs')

function registerRouters(app) {
    // 读取当前目录下的所有文件
    const files = fs.readdirSync(__dirname)
    // 便利所有的文件
    for (const file of files) {
        if(!file.endsWith('.router.js')) continue
        const router = require(`./${file}`)
        app.use(router.routes()).use(router.allowedMethods())
    }

}

module.exports = registerRouters