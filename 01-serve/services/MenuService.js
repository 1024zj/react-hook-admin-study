//获得UserModel
let MenuModel = require("../models/MenuModel")
let Service = require("./Service");
class MenuService extends Service {
  constructor() {
    super();
    //创建model
    this.model = new MenuModel();
  }
  //获得全部菜单用户
  async list() {
    let menus = await this.model.selectAll();
    let newTree = this.getTree(menus);
    return this.success("查询成功!", 1, newTree);
  }

  //获得全部菜单用户
  async selectByPid(pid) {

  }
  async deleteById(id) {
    await this.model.deleteById(id);
    let ob = await this.list();
    ob.msg = "删除成功！"
    return ob;
  }

  async add(ob) {

    let title = ob.title;
    let menu = await this.model.selectByTitle(title);
    if (menu.length > 0)
      return this.error("该菜单名字重复，请重新输入菜单名字", 0, {}, true);

    let res = await this.model.addMenu(ob);
    if (res) {
      let ob = await this.list();
      ob.msg = `添加[${title}]成功！`;
      ob.isShow = true;
      return ob;
    }
    return this.success(`添加[${ob.title}]`, -1, {}, true);
  }

  async update(ob) {
    let title = ob.title;
    let res = await this.model.updateMenu(ob);
    if (res) {
      return this.success(`更新[${title}]成功！`, 1, {}, true);
    } else {
      return this.success("更新失败!", -1)
    }
  }




}


module.exports = MenuService;