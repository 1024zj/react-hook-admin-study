//引入框架
let express = require("express");
//获得对象
var app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);

//引入body-parser模块
let bodyParser = require("body-parser");
//创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({
  extended: false,
});


//获得用户控制器
let UserController = require("./controllers/UserController")
app.post("/user/login", urlencodedParser, UserController.login);//用户登录请求
app.post("/user/add", urlencodedParser, UserController.add);//添加用户
app.get("/user/list", UserController.list);//查询所有的用户
app.post("/user/delete", urlencodedParser, UserController.delete);//删除用户

//获得菜单控制器
let MenuController = require("./controllers/MenuController")
app.get("/menu/list", MenuController.list);//获得菜单列表
app.post("/menu/delete", urlencodedParser, MenuController.delete);//菜单删除
app.post("/menu/add", urlencodedParser, MenuController.add);//添加新菜单
app.post("/menu/update", urlencodedParser, MenuController.update);//添加新菜单


//获得角色控制器
let roleController = require("./controllers/RoleController")
app.get("/role/list", roleController.list);//获得角色列表
app.post("/role/delete", urlencodedParser, roleController.delete);//获得角色列表
app.post("/role/update", urlencodedParser, roleController.update);//获得角色列表
app.post("/role/add", urlencodedParser, roleController.add);//获得角色列表


var server = app.listen(9999, () => {
  console.log("启动服务器");
});
