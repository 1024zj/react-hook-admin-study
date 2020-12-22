let ask = [
    //用户模块请求
    { type: 'post', api: "login", url: "/user/login" },
    { type: 'post', api: "addUser", url: "/user/add" },
    { type: 'post', api: "deleteUser", url: "/user/delete" },
    { type: 'get', api: "getUserList", url: "/user/list" },
    //菜单模块请求
    { type: 'get', api: "list", url: "/menu/list" },
    { type: 'post', api: "deleteMenu", url: "/menu/delete" },
    { type: 'post', api: "editMenu", url: "/menu/edit" },
    { type: 'post', api: "addMenu", url: "/menu/add" },
    { type: 'post', api: "updateMenu", url: "/menu/update" },
    //角色模块请求
    { type: 'get', api: "getRolesList", url: "/role/list" },
    { type: 'post', api: "deleteRole", url: "/role/delete" },
    { type: 'post', api: "updateRole", url: "/role/update" },
    { type: 'post', api: "addRole", url: "/role/add" }
];

export default ask;