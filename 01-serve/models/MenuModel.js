
//引入SqlBase
let SqlBase = require("./SqlBase");
const tableName = 'menu';
class MenuModel extends SqlBase {

    //根据type查询菜单
    async selectAll() {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} `
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    //根据pid查询菜单
    async selectByPid(pid) {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} WHERE pid = '${pid}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    //根据ids查询菜单
    async selectByIds(ids) {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} WHERE id = '${ids}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    //根据ids查询菜单
    async selectByTitle(title) {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} WHERE title = '${title}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    //根据type查询菜单
    async selectByType(type) {
        //1,编写sql语句
        let sql = `SELECT * FROM ${tableName} WHERE type = '${type}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }
    async deleteById(id) {
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.delete(tableName, { id: id });
        return ob;
    }
    async addMenu(ob) {
        //1,调用父类里面的查询方法，返回数据
        let res = await this.insert(tableName, ob);
        return res;
    }
    async updateMenu(ob) {
        //2,调用父类里面的查询方法，返回数据
        ob.key2 = ob.id + new Date().getTime() + "";
        let res = await this.update(tableName, ob, { id: ob.id });
        return res;
    }





}

module.exports = MenuModel