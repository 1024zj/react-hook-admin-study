/**
 * 邮箱
 * @param {*} s
 */
const isEmail = (s) => {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

/**
 * 手机号码
 * @param {*} s
 */
const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

/**
 * 电话号码
 * @param {*} s
 */
const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * URL地址
 * @param {*} s
 */
const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};

export default { isEmail, isMobile, isPhone, isURL };
