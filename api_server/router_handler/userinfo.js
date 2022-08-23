// 导入 数据库操作 模块
const db = require('../db/index');
// 导入处理密码 模块
const bcrypt = require('bcryptjs');

// 获取用户基本信息处理函数
exports.getUserInfo = (req, res)=>{
    // 定义查询用户信息的 SQL 语句
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
    //调用 db.query() 执行 SQL 语句
    db.query(sql, req.auth.id, (err, results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err);
        // 判断影响的行数是否 = 1
        if(results.length !==1) return res.cc('获取用户信息失败！！');

        // 用户信息获取
        res.send({
            status: 0,
            message: '获取用户信息成功！！',
            data: results[0]
        });
    });
}

// 更新用户基本信息处理函数
exports.updateUserInfo = (req, res)=>{
    // 定义待执行的 SQL 语句
    const sql = `update ev_users set ? where id=?`;
    // 调用待执行的 db.query() 执行 SQL 语句
    db.query(sql, [req.body, req.body.id], (err, results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err);
        // 判断影响行数是否 =1
        if(results.affectedRows !==1) return res.cc('更新用户基本信息失败，暂无此 id 的用户！');
        // 成功
        res.cc('更新用户基本信息成功！');
    });
}

// 更新用户密码处理函数
exports.updatePassword = (req, res)=>{
    // 根据 id 查询用户信息
    const sql = `select * from ev_users where id=?`;
    // 执行根据 id 查询用户信息的 SQL 语句
    db.query(sql, req.auth.id, (err, results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err);
        // 判断结果是否存在
        if(results.length !== 1) return res.cc('用户不存在！');

        // 判断旧密码是否正确                       用户输入的密码    数据库中的密码
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        // 如果 compareResult值 ！= true，则返回错误
        if(!compareResult) return res.cc('旧密码错误！');
        
        // 定义更新密码的 SQL 语句
        const sql = `update ev_users set password=? where id=?`;
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        // 调用 db.query 执行 SQL 语句
        db.query(sql, [newPwd, req.auth.id], (err, results)=>{
            // 执行 SQL 语句失败
            if(err) return res.cc(err);
            // 判断影响的行数是否 = 1
            if(results.affectedRows !==1) return res.cc('更新密码失败！');
            res.cc('更新密码成功！', 0);
        });
    });
}

// 更换用户头像的处理函数
exports.updateAvatar = (req, res)=>{
    // 定义更新头像的 SQL 语句
    const sql = `update ev_users set user_pic=? where id=?`;
    // 调用 db.query 执行 SQL 语句
    db.query(sql, [req.body.avatar, req.auth.id], (err, results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err);
        // 判断影响的行数是否 = 1
        if(results.affectedRows !==1) return res.cc('更换头像失败！');
        res.cc('更新头像成功！', 0);
    });
}