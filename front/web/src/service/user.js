import request from "./axios";
// 用户注册
export function newUserRegister({
  username,
  email,
  password,
  repeatPassword,
  nickname = "",
  verifycode,
}) {
  return request({
    url: "/user/register",
    method: "POST",
    data: {
      username,
      email,
      password,
      repeatPassword,
      nickname,
      verifycode,
    },
  });
}

// 用户登录
export function userLogin({ loginname, password, veritycode }) {
  return request({
    url: "/user/login",
    method: "POST",
    data: {
      loginname,
      password,
      veritycode,
    },
  });
}
// 退出系统
export function userLogout() {
  return request({
    url: "/user/logout",
    method: "POST",
    data: {},
  });
}

// 获取用户信息
export function getUserInfo(id) {
  return request({
    url: "/user/finduser",
    headers: {
      isAuth: true,
    },
    params: {
      id,
    },
  });
}

// 用户修改密码
export function updatePassword({
  oldPassword,
  newPassword,
  repeatNewPassword,
}) {
  return request({
    url: "/user/updatepassword",
    method: "POST",
    headers: {
      isAuth: true,
    },
    data: {
      oldPassword,
      newPassword,
      repeatNewPassword,
    },
  });
}
