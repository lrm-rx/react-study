import { Login } from "@/api/interface/index";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
import AuthButtons from "@/assets/json/authButtons.json";
import http from "@/api";

/**
 * @name 登录模块
 */
// 获取验证码
export const loginVerityCode = () => {
  return http.get<Login.VerityCode>("/user/veritycode");
};
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/user/login", params, {
    headers: { noLoading: true },
  }); // 正常 post json 请求  ==>  application/json
};

// * 获取按钮权限
export const getAuthButtonListApi = () => {
  // return http.get<Login.ResAuthButtons>(
  //   `/auth/buttons`,
  //   {},
  //   { headers: { noLoading: true } }
  // );
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtons.json 数据
  return AuthButtons;
};

// * 获取菜单列表
export const getAuthMenuListApi = () => {
  // return http.get<Menu.MenuOptions[]>(
  //   `/menu/list`,
  //   {},
  //   { headers: { noLoading: true } }
  // );
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
  return DynamicRouter;
};

// * 用户退出登录
export const logoutApi = () => {
  return http.post("/user/logout");
};
