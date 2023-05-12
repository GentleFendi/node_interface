# node_interface
> 基于 Node 后端项目

`npm包管理`
| 包 | 说明 |
| :-- | :-- |
| express |  |
| cors |  跨域 |
| mysql2 | 数据库 |
| bcrypt js | 数据库用户密码加密 |
| joi | 定义前端传递数据的验证规则 |
| @es cook/express-joi | 自动对表单数据进行验证 |
| json web token | 生成 Token验证 字符串包 |
| express-jwt | 解析 Token |

`请求操作`
| 请求 | 说明 |
| :--- | :--- |
| get | 获取 |
| post | 提交上传 |
| put | 修改|
| delete | 删除 |


`文件说明`
| 文件 | 说明 |
| :--- | :---|
| app  | 项目入口文件 |
| router/user | 存放路由模块 - 登录 / 注册 |
| router/user info | 存放路由模块 - 修改信息 / 修改密码 |
| router/art_cate | 文章分类路由模块 - 获取信息 / 新增信息 |
| router_handler/user | 存放路由处理函数 - 登陆 / 注册 |
| router_handler/user info | 存放路由处理函数 - 修改信息 / 修改密码 |
| router_handler/art_cate | 存放路由处理函数 - 增删查改 |
| package	| JSON配置文件 |
| package-lock | JSON配置文件 |
| node_modules | npm包文件 |
| db/index | 数据库文件 |
| schema/user | 用户信息 验证规则模块 - user |
| schema/art_cate | 用户信息 验证规则模块 - art_cate |
| config | 全局配置文件 Token 密钥 |
