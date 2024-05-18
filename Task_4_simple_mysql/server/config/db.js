const mysql = require('mysql2/promise')



const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Navneet@2589@Navneet',
    database: 'student_db'
})

module.exports = mysqlPool;