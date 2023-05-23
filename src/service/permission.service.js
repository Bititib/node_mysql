const connection = require('../app/databases')

class PermissionService {

    // async checkMoment(moment_id,id){
    //     const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ? `

    //     const [result] = await connection.execute(statement,[moment_id,id])
    //     return !!result.length
    // }

    async checkResource(resourceName,resourceId,id){
        const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ? `

        const [result] = await connection.execute(statement,[resourceId,id])
        return !!result.length
    }
} 

module.exports = new PermissionService()