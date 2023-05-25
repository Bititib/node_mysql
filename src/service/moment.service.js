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
        JSON_OBJECT('id',u.id,'name',u.usename,'avatarURL',u.avatar_url,'createData',u.date) users,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) comCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
        FROM moment m 
        LEFT JOIN user u ON u.id = m.user_id
        LIMIT 10 OFFSET 0;`;
        const [result] = await connection.execute(statement,[String(size),String(offset)])
        
        return result
    }

    async queryId(id){
        const statement = `SELECT 
        m.id,m.content,m.createAt,m.updateAt,
        JSON_OBJECT('id',u.id,'name',u.usename,"avatarURL",u.avatar_url,'createData',u.date) users,
        (
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
                        "user",JSON_OBJECT("id",cu.id,"name",cu.usename,"avatarURL",cu.avatar_url)
                    )
                )
            FROM comment c 
            LEFT JOIN user cu ON cu.id = c.user_id
            WHERE c.moment_id = m.id
        ) comments,
        (
            JSON_ARRAYAGG(
                JSON_OBJECT("id",l.id,"name",l.Lname )
            )
        ) labels
        FROM moment m 
        LEFT JOIN user u ON u.id = m.user_id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON l.id = ml.label_id
        WHERE m.id = ?
        GROUP BY m.id;`;
        
        const [result] = await connection.execute(statement,[id])
        return result
    }

    async deleteID(moment_id){
        const statement = 'DELETE FROM moment WHERE id = ?;';
        const [result] = await connection.execute(statement,[moment_id]);
        return result
    }
    
    async updataId(content,id){

        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

        const[ result ] = await connection.execute(statement,[content,id])

        return result
    }
    
    
} 

module.exports = new momentService()