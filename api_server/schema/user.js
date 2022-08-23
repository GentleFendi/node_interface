// 导入定义验证规则的包
const joi = require('joi');

// 定义 id username password nickname email 的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string();
const email = joi.string().email();

const avatar = joi.string().dataUri().required();
/* 
    * string()              值必须是字符串
    * number()              值必须是数字
    * integer()             值必须是整数
    * alpha num()           值只能是包含 a-z A-Z 0-9 的字符串
    * min(length)           最小长度
    * max(length)           最大长度
    * required()            值是必填项，不能为 undefined
    * pattern(正则表达式)    值必须符合正则表达式的规则
    * dataUri()             值是Uri字符串  例如：data:image/png;base64,VE9PTU FOW VNF Q1J FVF M=
*/

// 验证规则对象 - 注册和登录表单数据
exports.reg_login_schema = {
    body: {
        username,
        password,
        email,
        nickname,
    }
};

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    // 需要对 req.body 里面的数据验证
    body: {
        id: id,
        nickname: nickname,
        email: email,
    }
},

// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        // 新密码 ！= 旧密码，并且要符合密码验证规则 concat(password)
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar: avatar,
    }
}