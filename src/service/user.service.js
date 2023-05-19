const connection = require('../app/databases')


class Service{
    async create(user){
        // 获取用户数据
         const { usename,password } = user
        // 拼接statment
         const statement = 'INSERT INTO `user` (usename,password) VALUES ( ? , ? );'
        // 执行sql
        const [result] = await connection.execute(statement,[usename,password])
        
        return result
    }

    async query(name){
        const statement = 'SELECT * FROM `user` WHERE usename=?;';
        const [ values ] = await connection.execute(statement,[name]);
        return values 
    }
}


module.exports = new Service();