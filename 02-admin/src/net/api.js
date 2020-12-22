//包含所有的请求模块
import { get, post, source } from "./ajax";

import ask from "./config";

const cancel = () => {
  source.cancel('联网请求放弃！');
}


const ajaxApi = (type, url) => {
  let fun;
  switch (type) {
    case "post":
      fun = (ob) => post(url, ob);
      return fun;
    case "get":
      fun = (ob) => get(url, ob);
      return fun;
    default: break;
  }
}
//获得请求的数量
let length = ask.length;
//创建

const api = { apiCancel: cancel };

for (let i = 0; i < length; i++) {
  //获得每个对象的api
  let apiStr = ask[i].api;
  //获得每个类型
  let type = ask[i].type;
  //获得请求的地址
  let url = ask[i].url;
  api[apiStr] = ajaxApi(type, url);
}

export default api;
