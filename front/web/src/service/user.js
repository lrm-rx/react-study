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

// 获取用户信息
export function getUserInfo(id) {
  return request({
    url: "/user/finduser",
    params: {
      id
    },
  });
}
