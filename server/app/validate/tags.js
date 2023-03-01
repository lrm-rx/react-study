module.exports = (app) => {
  // 自定义校验规则
  app.validator.addRule("tags-create-name", (rule, value) => {
    const reg = RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_\-.]{2,20}$/);
    if (!(Object.prototype.toString.call(value) === "[object String]")) {
      return "标签名称必须是字符串!";
    }
    if (!value.trim()) {
      return "标签名称只能包含英文字母和数字/汉字/特殊字符(_.-)且长度应该在3-20之间!";
    }
    if (!reg.test(value.trim())) {
      return "标签名称的长度应该在2-20之间!";
    }
  });
  app.validator.addRule("tags-page", (rule, value) => {
    // if (!(Object.prototype.toString.call(value) === "[object String]")) {
    //   return "页数必须是字符串!";
    // }
    if (/^\d+$/.test(value)) {
      return "页数必须是字符串";
    }
  });
  // page: {
  //   type: "string",
  //   required: false,
  //   allowEmpty: true,
  //   default: 1,
  // },
  // pageSize: {
  //   type: "string",
  //   required: false,
  //   allowEmpty: true,
  //   default: 10,
  // },
  // name: {
  //   type: "string",
  //   required: false,
  //   min: 2,
  //   max: 20,
  //   allowEmpty: true,
  //   format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
  // },
};
