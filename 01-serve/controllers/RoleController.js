const qs = require('qs')
//控制器只解析前端请求数据
let RoleService = require("../services/RoleService")
module.exports.list = async function (req, res) {
    //1,创建业务逻辑层,MenuService是对象的引用
    let roleService = new RoleService();
    //2,把解析的数据发给业务逻辑层
    let ob = await roleService.list();
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.delete = async function (req, res) {
    let { id } = req.body;
    //1,创建业务逻辑层,MenuService是对象的引用
    let roleService = new RoleService();
    //2,把解析的数据发给业务逻辑层
    let ob = await roleService.deleteById(id);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.add = async function (req, res) {
    let buffer = qs.parse(req.body);
    //1,创建业务逻辑层,MenuService是对象的引用
    let roleService = new RoleService();
    //2,把解析的数据发给业务逻辑层
    let ob = await roleService.add(buffer);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.update = async function (req, res) {

    let buffer = qs.parse(req.body);

    //1,创建业务逻辑层,MenuService是对象的引用
    let roleService = new RoleService();
    //2,把解析的数据发给业务逻辑层
    let ob = await roleService.update(buffer);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}



