const { Controller } = require("egg");
const BaseController = require("./base");

class AdminController extends BaseController {
  async list() {
    const { ctx, app, service } = this;
    const result = await service.admin.list();
    if (
      result.data === app.config.SERVER_ERROR ||
      result.total === app.config.SERVER_ERROR
    ) {
      return this.error(app.config.SERVER_ERROR, 500);
    }
    return this.success(result.data, "查询成功!");
  }

  async del() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.body = await service.admin.del(id);
  }

  async login() {
    const { ctx, app, service } = this;
    const { body } = ctx.request;
    const params = {
      username: ctx.helper.escape(body.username),
      password: ctx.helper.escape(body.password),
    };
    try {
      this._validate(
        [
          {
            username: [
              { type: "admin-username" },
              { allowEmpty: false },
              { max: 2 },
            ],
            password: [
              { type: "admin-password" },
              { allowEmpty: false },
              { max: 2 },
            ],
          },
        ],
        ctx.request.body
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.admin.login(params);
    if (result === app.config.SERVER_ERROR) {
      return this.error(app.config.SERVER_ERROR, 500);
    }
    return this.success(result, "登录成功!");
  }
  async logout() {
    const { ctx, service } = this;
    const result = await service.admin.logout();
    return this.success("", result);
  }
}

module.exports = AdminController;
