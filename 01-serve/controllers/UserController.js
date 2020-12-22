//控制器只解析前端请求数据
let UserService = require("../services/UserService")
module.exports.login = async function (req, res) {
    //1,解析用户请求的数据
    const { name, passwd } = req.body;

    //2,创建业务逻辑层,userService是对象的引用
    let userService = new UserService();
    //3,把解析的数据发给业务逻辑层
    let ob = await userService.login(name, passwd);
    //4,把业务逻辑层返回的数据发回给前端

    res.json(ob)
}
/**
 * 添加用户
 * @param {*} req 
 * @param {*} res 
 */
module.exports.add = async function (req, res) {
    //1,创建业务逻辑层,userService是对象的引用
    let userService = new UserService();
    //2,把解析的数据发给业务逻辑层
    let ob = await userService.add(req.body);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}

/**
 * 获得全部用户
 * @param {*} req 前端请求
 * @param {*} res 服务器反馈
 */
module.exports.list = async function (req, res) {
    //1,创建业务逻辑层,userService是对象的引用
    let userService = new UserService();
    //2,把解析的数据发给业务逻辑层
    let ob = await userService.list();
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.delete = async function (req, res) {
    //1,创建业务逻辑层,userService是对象的引用
    let userService = new UserService();
    //2,把解析的数据发给业务逻辑层
    let ob = await userService.delete(req.body);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}

