module.exports = (app) => {
  // 自定义校验规则
  app.validator.addRule("tags-name", (rule, value) => {
    const reg = RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_\-.]{2,20}$/);
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "标签名称必须是字符串!";
    }
    if (!reg.test(value.trim())) {
      return "标签名称只能包含英文字母和数字/汉字/特殊字符(_.-)且长度应该在2-20之间!";
    }
  });
  app.validator.addRule("tags-page", (rule, value) => {
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "页数必须是字符串!";
    }
  });
  app.validator.addRule("tags-pageSize", (rule, value) => {
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "页大小必须是字符串!";
    }
  });
};
