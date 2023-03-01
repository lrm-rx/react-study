module.exports = (app) => {
  // 自定义校验规则
  app.validator.addRule("admin-username", (rule, value) => {
    const reg = RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_.\-]{3,20}$/);
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "用户名称必须是字符串!";
    }
    if (!value.trim()) {
      return "用户名称不能为空!";
    }
    if (!reg.test(value)) {
      return "用户名称只能包含英文字母和数字/汉字/特殊字符(_.-)且长度应该在3-20之间!";
    }
  });
  app.validator.addRule("admin-password", (rule, value) => {
    const reg = RegExp(/^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9!@#_.]{6,20}$/);
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "密码必须是字符串!";
    }
    if (!value.trim()) {
      return "密码不能为空!";
    }
    if (!reg.test(value)) {
      return "密码必须包含英文字母和数字或特殊字符(!@#_.)且长度应该在6-20之间!";
    }
  });
};
