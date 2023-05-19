const mysql = require('mysql2');
const { databasePassword } = require('../config/server');

// 创建连接池 
const connectionPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:databasePassword,
    database:'node_project',
    connectionLimit:10
})

//获取连接是否成功
connectionPool.getConnection((err,connection)=>{
    // 判断是否报错
    if(err){
        console.log('连接失败')
        return
    }

    connection.connect(err => {
        if(err){
            console.log('数据库交互失败~')
        }else{
            console.log('数据库交互成功~')
        }
    })
})

//获取连接池中的连接对象(promise)
const connection = connectionPool.promise()

module.exports = connection


