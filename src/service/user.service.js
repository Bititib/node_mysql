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

    async updateUserAvatar(avatarUrl,user_id){
        const statement =  `UPDATE user SET avatar_url = ? WHERE id = ?;`
        const [result] = await connection.execute(statement,[avatarUrl,user_id]);
        return result
    }
}


module.exports = new Service();