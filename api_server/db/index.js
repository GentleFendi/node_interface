const mysql = require('mysql2');
const db = mysql.createPool({
    host: '127.0.0.2',
    user: 'root',
    password: '666666',
    database: 'fen'
});

/* ---------------------------------
        router_handler
        1. 检测表单数据是否合法
        2. 检测用户名是否被占用
        3. 对密码进行加密处理
        4. 插入新用户
 --------------------------------- */


module.exports = db;