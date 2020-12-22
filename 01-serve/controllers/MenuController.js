//控制器只解析前端请求数据
let MenuService = require("../services/MenuService")
module.exports.list = async function (req, res) {
    //1,创建业务逻辑层,MenuService是对象的引用
    let menuService = new MenuService();
    //2,把解析的数据发给业务逻辑层
    let ob = await menuService.list();
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.delete = async function (req, res) {
    //1,解析前端提交数据
    const { id } = req.body;
    //2,创建业务逻辑层,MenuService是对象的引用
    let menuService = new MenuService();
    //3,把解析的数据发给业务逻辑层
    let ob = await menuService.deleteById(id);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}
module.exports.add = async function (req, res) {
    //1,创建业务逻辑层,MenuService是对象的引用
    let menuService = new MenuService();
    //2,把解析的数据发给业务逻辑层
    let ob = await menuService.add(req.body);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}

module.exports.update = async function (req, res) {
    //1,创建业务逻辑层,MenuService是对象的引用
    let menuService = new MenuService();
    //2,把解析的数据发给业务逻辑层
    let ob = await menuService.update(req.body);
    //3,把业务逻辑层返回的数据发回给前端
    res.json(ob)
}



