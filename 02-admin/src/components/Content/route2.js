import menu from "../../views/sys/menu/menu";
import role from "../../views/sys/role/role";
import user from "../../views/sys/user/user";

const routes2 = [
  {
    path: "/sys/menu",
    title: " 菜单管理",
    component: menu,
  },
  {
    path: "/sys/role",
    title: "角色管理",
    component: role
  }, {
    path: "/sys/user",
    title: "管理员管理",
    component: user
  },
];


export default routes2;
