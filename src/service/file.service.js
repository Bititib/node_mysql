const connection = require('../app/databases')
class FileService {
    async createContent(filename,mimetype,size,user_id){
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
        const [result] = await connection.execute(statement,[filename,mimetype,size,user_id])
        return result
    }

    async queryUserAvatar(user_id){

        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const [result] = await connection.execute(statement,[user_id])

        return result.pop()
    }
} 

module.exports = new FileService()