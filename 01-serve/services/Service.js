
const { Success, MError } = require("../utils/Result");
const { getTree } = require("../utils/TreeTool");
const { getToken } = require("../utils/TokenTools");
const Random = require('string-random');
const uuid = require("uuid");
const Crypto = require('crypto');
class Service {
    constructor() {

    }
    success(msg, code, ob = {}, isShow) {
        let buffer = Success(msg, code, ob, isShow)
        return buffer;
    }
    error(msg, code, ob = {}, isShow) {
        let buffer = MError(msg, code, ob, isShow)
        return buffer;
    }
    crypto(msg) {
        return Crypto.createHash('md5').update(msg).digest("hex");
    }
    random() {
        return Random(5);
    }
    getUid() {
        return uuid.v1();

    }
    getToken(uid) {
        //当前项目主要讲解前端，此处通过RSA获得token不介绍
        return getToken(uid);
    }

    getTree(data) {
        return getTree(data);
    }

    setKey(array) {
        //1,获得数组长度
        let length = array.length;
        //1,遍历数组
        for (let i = 0; i < length; i++) {
            array[i].key = array[i].id + new Date().getTime();
        }
        return array;
    }

    getMap(array) {
        //1,获得数组的长度
        let length = array.length;
        let map = new Map();
        for (let i = 0; i < length; i++) {
            map.set(array[i].id, array[i]);
        }
        return map;
    }
}


module.exports = Service;