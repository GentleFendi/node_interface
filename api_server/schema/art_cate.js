// 1. 导入定义验证规则模块
const joi = require('joi');

// 2. 定义 name 和 alias 的验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 2.1 id 的校验规则
const id = joi.number().integer().required();

// 3. 向外共享验证规则对象
exports.art_cate_schema = {
    body: {
        name,
        alias,
    }
}

// 4. 验证规则对象 - 删除分类
exports.delete_cate_schema = {
    params: {
        id,
    }
}

// 5. 验证规则对象 - 根据 id 获取文章分类
exports.get_cate_schema = {
    params: {
        id,
    }
}

// 6. 验证规则对象 - 根据 id 更新文章分类
exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    }
}