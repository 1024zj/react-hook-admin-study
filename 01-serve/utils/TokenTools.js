
const RSA = require("../rsa/RSA");
const key = RSA.getRSAKey(); // 得到加密后的秘钥,用于调用加密方法
exports.getToken = (uid) => {
    let header = { // token头部信息
        "sec": "RSA", // 密码算法RSA
        "type": "JWT" // 统一jwt类型
    };
    let payload = { // 定义数据信息, 可以自己定义, 但是不要放机密信息
        "nbf": new Date().getTime(), // 生效时间当前系统时间毫秒数
        "uid": uid, // 用户uid
        "lastTime": 60 * 1000 * tokenTimeout,
    }
    const sign = key.encrypt(RSA.base64(header) + "." +
        RSA.base64(payload), 'base64'); // 对前两部分生成RSA签名字符串
    const token = RSA.base64(header) + "." +
        RSA.base64(payload) + "." + sign; // 生成token
    return token;
}