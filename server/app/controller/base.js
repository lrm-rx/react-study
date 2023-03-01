const { Controller } = require("egg");

class BaseController extends Controller {
  // 操作成功，返回数据
  async success(data, message, code = 200) {
    const { ctx } = this;
    if (!data) {
      ctx.body = {
        code,
        message,
      };
    } else {
      ctx.body = {
        code,
        message,
        data,
      };
    }
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
  // this._validate(
  //   [
  //     {
  //       tagName: [
  //         { type: "tags-create-name" },
  //         { allowEmpty: false },
  //         { max: 2 },
  //       ],
  //     },
  //   ],
  //   params
  // );
  _validate(dataArrary, bodyJson) {
    const { ctx } = this;
    const validateObj = {};
    let tempObj = {};
    if (dataArrary.length <= 0) {
      return;
    }
    try {
      for (const item of dataArrary) {
        const key = Object.keys(item)[0];
        const value = item[key];
        for (const subItem of value) {
          const subKey = Object.keys(subItem)[0];
          const subValue = subItem[subKey];
          validateObj[key] = {
            ...tempObj,
            [subKey]: subValue,
          };
          tempObj = validateObj[key];
        }
      }
    } catch (error) {
      throw new Error(error);
    }
    ctx.validate(validateObj, bodyJson);
  }
}

module.exports = BaseController;
