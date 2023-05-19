// node 内置的 md5 加密算法 crypto
const crypto = require('crypto')

function md5Password(password){
    // 创建 md5 加密算法
    const md5 = crypto.createHash('md5')

    const md5Password = md5.update(password).digest('hex') 

    return md5Password
}

module.exports = {
    md5Password
}