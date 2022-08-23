    // 导入数据库操作模块
    const db = require('../db/index');
    // 导入 bcrypt js 用户密码加密包
    const bcrypt = require('bcryptjs');
    // 导入生成 Token 包
    const jwt = require('jsonwebtoken');
    // 导入全局配置文件
    const config = require('../config');


// 注册新用户的处理函数
exports.regUser = (req, res)=>{
    const userinfo = req.body;                                                      /* 获取客户端提交到服务器的用户信息 */

    const sqlStr = `select * from ev_users where username=?`;                       /* 2. 定义 SQL 语句，查询用户名是否被占用 */
    db.query(sqlStr, userinfo.username, (err, result)=>{
        if(err){                                                                    /* 执行 SQL 语句失败 */
            return res.cc(err);
        }
        if(result.length > 0){                                                      /* 判断用户名是否被占用 */
            return res.cc('用户名已被占用,请更换其他用户名!');
        }

        // 加密之前的密码
        visual_password = userinfo.password;
        // 调用 bcrypt.hashSync()  对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);                 /* 3. 密码加密 */
        // 插入新用户 SQL 语句
        const sql = `insert into ev_users set ?`;                                   /* 4. 插入用户 */
        // 调用 db.query 执行 SQL 语句
        db.query(sql, {
                username: userinfo.username, 
                password: userinfo.password, 
                nickname: userinfo.nickname,
                email: userinfo.email,
                visual_password: visual_password,
            },(err, result)=>{
            // 判断是否执行 SQL 语句成功
            if(err) return res.cc(err);
            // 判断影响行数是否为 0
            if(result.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！');
            // 注册成功
            res.cc('注册成功！', 0);
        });
    });

    // res.send('registered OK');
}


// 登录的处理函数
exports.login = (req, res)=>{
    // 接收表单数据
    const userinfo = req.body;
    // 定义 SQL 语句
    const sql = `select * from ev_users where username=?`;
    // 执行 SQL 语句,根据用户名查询用户信息
    db.query(sql, userinfo.username, (err, results)=>{
        // SQL 语句执行失败
        if(err) return res.cc(err);
        // SQL 语句执行成功，但是获取到的数据条数 ！= 1
        if(results.length !== 1) return res.cc('登录失败，用户名不存在！');

        //  判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if(!compareResult) return res.cc('登陆失败，密码错误！！');

        //  在服务器端生成 Token 的字符串
        const user = {...results[0], password: '', user_pic: ''};
        // 对用户信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});    /* 加密对象， 密钥，有效期 */
        // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！！',
            Token: 'Bearer ' + tokenStr,
        });
    });
}