const { Controller } = require("egg");

class BaseController extends Controller {
  success(data = {}) {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      data,
    };
  }

  error(errMsg = "") {
    const { ctx } = this;
    ctx.body = {
      status: 500,
      errMsg,
    };
  }
}

module.exports = BaseController;
