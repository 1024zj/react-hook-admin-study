//获得UserModel
let RoleModel = require("../models/RoleModel")
let Service = require("./Service");
let MenuService = require("./MenuService");
class RoleService extends Service {
  constructor() {
    super();
    //创建model
    this.model = new RoleModel();
  }

  async roleList() {
    let res = await this.model.selectAll();
    return res;
  }


  async list() {
    let res = await this.roleList();

    let menuService = new MenuService();
    let ob = await menuService.list();
    let menus = ob.ob;

    for (let i = 0; i < res.length; i++) {
      res[i].key = i;
      res[i].treeData = this.setMenuToRole(menus);
      res[i].menus = this.stringToArray(res[i].menus);
    }
    return this.success("查询成功！", 1, res);
  }

  stringToArray(state) {
    //把字符串转为数组
    let array = state.split(',');
    return array;
  }

  setMenuToRole(menus) {

    let treeData = []
    for (let i = 0; i < menus.length; i++) {
      let father = this.createTreeDom(menus[i]);
      father.children = []
      if (menus[i].children !== null && menus[i].children.length) {
        for (let j = 0; j < menus[i].children.length; j++) {
          father.children.push(this.createTreeDom(menus[i].children[j]));
        }
      }
      treeData.push(father);
    }
    return treeData;
  }

  createTreeDom(buffer) {
    let ob = {};
    ob.title = buffer.title;
    ob.key = buffer.id + "";
    return ob;
  }

  async deleteById(id) {
    let res = await this.model.deleteById(id);
    let ob = null;
    if (res) {
      ob = this.list();
      ob.msg = "删除成功!"
    } else {
      ob = this.success("删除失败", -1)
    }
    return ob;
  }
  async add(ob) {
    let res = await this.model.selectByName(ob.rolename);
    if (res.length > 0) {
      let newO = this.success("角色名字重复", -1, {}, true);
      console.log(newO)
      return newO;
    }
    let insertRes = await this.model.insertRole(ob);

    if (insertRes) {

      let res = await this.list();
      res.isShow = true;
      res.msg = `添加[${ob.rolename}]成功！`
      return res;
    }
    return this.success("添加失败,请重新添加！", -1, true);
  }
  async update(ob) {

    let res = await this.model.updateRole(ob);
    if (res) {
      return this.list();
    } else {
      return this.success("更新失败!", -1);
    }
  }

}


module.exports = RoleService;