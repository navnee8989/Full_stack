const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Navneet@2589@Navneet',
    database: 'gst_info'
});

module.exports = pool;
