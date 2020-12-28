import HomeHook from "../views/home/HomeHook";
import LoginHook from "../views/login/loginPage";


const routes = [
  {
    path: "/login",
    title: "登录页面",
    component: LoginHook,
  },
  {
    path: "/",
    title: "主页面",
    component: HomeHook,
    auth: true, //需要拦截
  },
];
export default routes;
