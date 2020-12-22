
//引入SqlBase
let SqlBase = require("./SqlBase")
const tableName = 'user';
class UserModel extends SqlBase {

    /**
     * 查询全部的用户
     */
    async selectAll() {
        //1,编写sql语句
        let sql = `select * from ${tableName}`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob;
    }

    /**
     * 根据条件进行删除
    */
    async deleteUser(ob) {
        //调用父类里面的查询方法，返回数据
        let res = await this.delete(tableName, ob);
        return res;
    }

    //插入用户
    async insertUser(ob) {
        //调用父类里面的查询方法，返回数据
        let res = await this.insert(tableName, ob);
        return res;
    }
    //根据用户名查询用户
    async selectUserByName(name) {
        //1,编写sql语句
        let sql = `select * from ${tableName} where name ='${name}'`
        //2,调用父类里面的查询方法，返回数据
        let ob = await this.query(sql);
        return ob[0];
    }
    //更新用户
    updateUser() {

    }

}

module.exports = UserModel