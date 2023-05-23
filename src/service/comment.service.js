const connection = require('../app/databases')
class commentService {
    
    async createContent(content,user_id,momentId){
        const statement = "INSERT INTO `comment` (content,user_id,moment_id) VALUES (?,?,?);"
        const [ result ] = await connection.execute(statement,[content,user_id,momentId])
        return result
    }

    async replyContent(content,user_id,momentId,commentId){
        
        const statement = "INSERT INTO `comment` (content,user_id,moment_id,comment_id) VALUES (?,?,?,?);"
        const [ result ] = await connection.execute(statement,[content,user_id,momentId,commentId])
        return result
    }
} 

module.exports = new commentService()