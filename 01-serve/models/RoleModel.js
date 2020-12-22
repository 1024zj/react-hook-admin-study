
//引入SqlBase
let SqlBase = require("./SqlBase");
const tableName = 'role';
class RoleModel extends SqlBase {

    //根据pid查询菜单
    async selectAll() {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName}`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }
    //根据pid查询菜单
    async selectByName(title) {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} where rolename ='${title}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    async deleteById(id) {
        let ob = await this.delete(tableName, { id: id });
        return ob;
    }


    //根据pid查询菜单
    async insertRole(ob) {
        //设置状态
        ob.status = 1;
        //2,调用父类里面的查询方法，返回数据
        let res = await this.insert(tableName, ob);
        return res;
    }

    //对ob中id的数据更新
    async updateRole(ob) {
        let res = await this.update(tableName, ob, { id: ob.id });
        return res;
    }

}

module.exports = RoleModel