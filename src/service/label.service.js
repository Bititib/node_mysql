const connection = require('../app/databases')
class labelService {
    async createContent(name){
        const statement = `INSERT INTO label (Lname) VALUES (?);`;
        const [result] = await connection.execute(statement,[name])
        return result
    }

    async getLabelList(offset,size){
        const statement = `SELECT * FROM label LIMIT ? OFFSET ?;`
        const [result] = await connection.execute(statement,[offset,size])
        return result
    }

    async querLabelName(name){
        const statement = `SELECT * FROM label WHERE Lname = ?;`;
        const [result] = await connection.execute(statement,[name])
        return result[0]
    }

} 

module.exports = new labelService()