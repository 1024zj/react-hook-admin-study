
const getNewMenus = (dom, menus) => {
  findDom(dom, menus);
};

const findDom = (dom, menus) => {

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].id === dom.id) {
      menus[i].key = menus[i].id + new Date().getTime();
      break;
    }
    if (menus[i].children !== 'undefined') {
      findDom(dom, menus[i].children);
    }
  }
}

export default { getNewMenus };
