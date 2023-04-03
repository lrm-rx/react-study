export const GLOBAL_HEADER_TO_TOP = 200; // 全局滚动条距离控制值
export const ARTICLE_HEADER_TO_TOP = 60; // 写文章页面滚动条距离控制值

export const USER_NAME_REG = /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/; // 用户名匹配正则
export const USER_PASSWORD_REG =
  /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9!@#_.]{6,20}$/; // 密码匹配正则
export const USER_EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // 邮箱匹配正则
export const EASY_TYPER_URL = "https://api.xygeng.cn/one";
// "https://api.uomg.com/api/rand.qinghua?format=json";

export const LOADING_ID = "list-loading";
export const PAGE = {
  pageNum: 1,
  pageSize: 10,
};
