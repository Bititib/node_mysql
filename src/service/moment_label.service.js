const connection = require('../app/databases')

class MomentLabelService {
    async InsertML(moment_id,label_id){
        const statement = 'INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);'
        const [result] = await connection.execute(statement,[moment_id,label_id])
        return result
    }

    async queryML(moment_id,label_id){
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ? ;'
        const [result] = await connection.execute(statement,[moment_id,label_id])
        
        return !!result.length
    }
} 

module.exports = new MomentLabelService()