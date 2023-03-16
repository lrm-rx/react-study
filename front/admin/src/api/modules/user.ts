import { ResPage, User } from "@/api/interface/index";
import { formType } from "@/layout/components/header/components/PasswordDialog.vue";
import qs from "qs";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
  return http.get<ResPage<User.ResUserList>>(
    `/user/list${qs.stringify(params, { addQueryPrefix: true })}`
  );
};

// * 新增用户
export const addUser = (params: { id: string }) => {
  return http.post("user/admin/adduser", params);
};

// * 编辑用户
export const editUser = (params: { id: string }) => {
  return http.post(`user/update/${params.id}`, params);
};

// * 修改用户密码
export const updatePassword = (params: formType) => {
  return http.post(`user/updatepassword`, params);
};

// * 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.post(`/user/delete`, params);
};

// * 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(`/user/rest_password`, params);
};
