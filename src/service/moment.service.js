const connection = require('../app/databases')

class momentService {
    async createContent(userContent,user_id){
        
        // 将内容存储到数据库中
        const statement = "INSERT INTO `moment` (content,user_id) VALUES ( ?,?);"
        const [result] = await connection.execute(statement,[userContent,user_id])
        return result
    }

    async queryList(offset = 0,size = 10){

        const statement = `SELECT 
        m.id,m.content,m.createAt,m.updateAt,
        JSON_OBJECT('id',u.id,'name',u.usename,'createData',u.date) users
        FROM moment m 
        LEFT JOIN user u ON u.id = m.user_id
        LIMIT ? OFFSET ?;`;
        const [result] = await connection.execute(statement,[String(size),String(offset)])
        
        return result
    }

    async queryId(id){
        const statement = `SELECT 
        m.id,m.content,m.createAt,m.updateAt,
        JSON_OBJECT('id',u.id,'name',u.usename,'createData',u.date) users
        FROM moment m 
        LEFT JOIN user u ON u.id = m.user_id
        WHERE m.id = ?;`;
        
        const [result] = await connection.execute(statement,[id])
        return result
    }

    async updataId(content,id){

        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

        const[ result ] = await connection.execute(statement,[content,id])

        return result
    }
} 

module.exports = new momentService()