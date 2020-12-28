//1，调用MySQL模块
let mysql = require("mysql");
//2，创建一个connection
let connection = mysql.createConnection({
  host: "localhost", //主机 ip
  user: "root", //MySQL认证用户名
  password: "root", //MySQL认证用户密码
  port: "3306", //端口号
  database: "shop" //数据库里面的数据
});
//3,连接
connection.connect();
class SqlBase {
  constructor() {
  }
  work(sql) {
    return new Promise((resolve, reject) => {
      connection.query(sql, [], function (err, result) {
        if (err) {
          reject(err.message);
        } else {
          resolve(result)
        }
      });
    }).catch((error) => {
      console.error(error);
    })
  }
  async insert(tableName, obj) {

    let sqlStr = "";
    if (obj !== undefined && typeof obj === "object" && Object.keys(obj).length > 0) {
      sqlStr = ' ( ';
      for (let prop in obj) {
        sqlStr += prop + " , "
      }
      sqlStr = sqlStr.substr(0, sqlStr.length - 3);
      sqlStr += " ) VALUES ( ";
      for (let prop in obj) {
        sqlStr += (typeof obj[prop] === 'number' ? obj[prop] : "'" + obj[prop] + "'") + " , ";
      }
      sqlStr = sqlStr.substr(0, sqlStr.length - 3);
      sqlStr += " ) ";
    }

    sqlStr = `INSERT INTO ${tableName}` + sqlStr
    let res = await this.work(sqlStr);
    return res.affectedRows > 0;
  }


  async delete(tableName, obj) {
    let sql = `delete from ${tableName} where `
    for (let key in obj) {
      sql += `${key} = '${obj[key]}' and `
    }
    sql = sql.substring(0, sql.length - 5);
    let res = await this.work(sql);
    return res.affectedRows > 0;
  }
  async query(sql) {
    let result = await this.work(sql);
    return result;
  }

  async update(tableName, obj, obj2) {

    //去掉obj里面的条件属性
    for (let key in obj2) {
      delete obj[key];
    }

    let sqlStr = `UPDATE ${tableName} SET `;
    if (obj !== undefined && typeof obj === "object" && Object.keys(obj).length > 0) {
      // 把对象的key:value拼接成 key=value的字符串
      for (let prop in obj) {
        sqlStr += prop + " = '" + obj[prop] + "' , "
      }
      sqlStr = sqlStr.substr(0, sqlStr.length - 3); // 去掉最后多加空格和逗号
    }

    sqlStr += ' where '
    for (let key in obj2) {
      sqlStr += `${key} = ${obj2[key]} and `;
    }
    sqlStr = sqlStr.substr(0, sqlStr.length - 5);

    let res = await this.work(sqlStr);
    return res.affectedRows > 0;
  }
}
module.exports = SqlBase;
