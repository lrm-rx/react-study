module.exports = (app) => {
  // 自定义校验规则
  app.validator.addRule("admin-username", (rule, value) => {
    const reg = RegExp(/^.{3,20}$/);
    if (!reg.test(value)) {
      return "用户名的长度应该在3-20之间!";
    }
  });
  app.validator.addRule("admin-password", (rule, value) => {
    const reg = RegExp(/^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9!@#_.]{6,20}$/);
    if (!reg.test(value)) {
      return "密码的必须包含英文字母和数字或特殊字符(!@#_.)且长度应该在6-20之间!";
    }
  });
};
