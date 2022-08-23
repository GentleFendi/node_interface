// 导入 express
const express = require('express');
// 创建服务器实例对象
const app = express();

const joi = require('joi');

// 导入并配置 cors 中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据 中间件     注意：只能解析 application/x-www-from-urlencoded 格式的表单数据
app.use(express.urlencoded({extended: false}));

    // res.cc 函数 -------- 优化 router_handler/user.js > res.cc 返回失败/成功结果 代码
    app.use((req, res, next)=>{
        // status 默认值=1，表示失败的情况
        // err 是一个错误对象，或者错误字符串
        res.cc = function (err, status = 1){
            res.send({
                status,
                message: err instanceof Error ? err.message : err
            });
        }
        next();
    });

    // 解析 Token的中间件
    const { expressjwt: expressJwt } = require("express-jwt");
    const config = require('./config');
    app.use(expressJwt({secret: config.jwtSecretKey, algorithms: ["HS256"]}).unless({path: [/^\/api/]}));

// 导入使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);
// 导入并使用文章分类的路由模块
const artCateRouter = require('./router/art_cate');
app.use('/my/article', artCateRouter);
// 导入并使用文章的路由模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);

    // 定义错误级别的中间件
    app.use((err, req, res, next)=>{
        // 验证失败导致的错误
        if(err instanceof joi.ValidationError) return res.cc(err);
        // 身份认证失败
        if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！！');
        // 未知的错误
        res.cc(err);
    });

// 启动服务器
app.listen(3007, ()=>{
    console.log('api server is running at http://127.0.0.1:3007');
});