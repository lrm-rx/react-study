const { Controller } = require("egg");

class BaseController extends Controller {
  // 操作成功，返回数据
  async success(data, message, code = 200) {
    const { ctx } = this;
    ctx.body = {
      code,
      message,
      data,
    };
  }

  // 操作失败，返回数据
  async error(message, code = 403) {
    const { ctx } = this;
    ctx.body = {
      code,
      message,
    };
  }

  // 参数校验
  _validate(dataArrary, bodyJson) {
    const { ctx } = this;
    const validateObj = {};
    if (dataArrary.length <= 0) {
      return;
    }
    for (const item of dataArrary) {
      const key = Object.keys(item)[0];
      const value = item[key];
      validateObj[key] = {
        type: value,
      };
    }
    ctx.validate(validateObj, bodyJson);
  }
}

module.exports = BaseController;
