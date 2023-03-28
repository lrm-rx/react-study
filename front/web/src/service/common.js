import request from "./axios";

// 首页greeting
export function getGreeting() {
  return request({
    url: "/common/greeting",
    params: {},
  });
}
// 获取登录验证码
export function getVertifyCode() {
  return request({
    url: "/user/veritycode",
    headers: {
      isShowLoading: false,
    },
    params: {},
  });
}
// 检查用户名是否可用
export function checkUserName({ username = "" }) {
  return request({
    url: "/user/checkusername",
    method: "POST",
    data: {
      username,
    },
  });
}
// 检查邮箱是否可用
export function checkEmail({ email = "" }) {
  return request({
    url: "/user/checkemail",
    method: "POST",
    data: {
      email,
    },
  });
}
// 发送邮箱验证码
export function sendEmail({ username = "", email = "" }) {
  return request({
    url: "/user/sendemail",
    method: "POST",
    data: {
      username,
      email,
    },
  });
}
