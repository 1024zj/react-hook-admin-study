//获得UserModel
let UserModel = require("../models/UserModel")
let Service = require("./Service");
let RoleService = require("./RoleService");
class UserService extends Service {
    constructor() {
        super();
        //创建model
        this.model = new UserModel();
    }
    async list() {
        //1,查询全部的用户
        let user = await this.model.selectAll();
        user = this.setKey(user);
        //获得角色列表
        let roleService = new RoleService();
        //获得角色列表
        let list = await roleService.roleList();
        //角色列表转为map
        let map = this.getMap(list);

        for (let i = 0; i < user.length; i++) {
            user[i].roleName = map.get(user[i].roleid).rolename;
        }

        return this.success("查询全部用户", 1, user);
    }
    //添加新用户
    async add(ob) {

        //1,根据name到数据库查询对应的密码
        let user = await this.model.selectUserByName(ob.name);
        //2,判断用户是否存在,如果存在就返回结果
        if (user)
            return this.error("用户已经存在", -1);
        //3,获得一个随机数
        let randomStr = this.random();
        //4,获得新的密码
        let passwdBuffer = ob.passwd + randomStr;
        //5,获得加密的新密码
        let newPassWd = this.crypto(passwdBuffer)
        //6，添加新用户
        ob.passwd = newPassWd;
        ob.randstr = randomStr;
        ob.uid = this.getUid();
        ob.status = 1;
        let res = await this.model.insertUser(ob);
        if (res) {
            return this.list();
        } else {
            return this.error("用户添加失败", 0);
        }
    }
    //处理用户是否合法
    async login(name, passwd) {
        //1,根据用户名查询用户
        let user = await this.model.selectUserByName(name);
        //2,判断用户是否存在
        if (user == null) {
            let error = this.error("用户不存在", -1);
            return error;
        }
        //3,对用户提交的密码进行拼接
        let buffer = passwd + user.randstr;
        //4,对拼接的密码进行加密
        let newPassWd = this.crypto(buffer);
        //5,对用户进行判断
        if (user.passwd == newPassWd) {
            user.token = this.getToken(user.uid)
            delete user.uid;
            return this.success("用户合法", 1, user);
        } else {
            return this.error("用户密码错误,重新输入", 0);
        }

    }
    async delete(ob) {
        //1,根据条件进行删除
        let res = await this.model.deleteUser(ob);
        if (!res) {
            return this.success("删除用户失败！", -1);
        }
        //2,查询全部的用户
        let user = await this.list();
        return user;
    }


}


module.exports = UserService;