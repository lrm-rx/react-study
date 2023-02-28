"use strict";

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
    try {
      this._validate(
        [{ username: "admin-username" }, { password: "admin-password" }],
        ctx.request.body
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.admin.login(ctx.request.body);
    if (result === app.config.SERVER_ERROR) {
      return this.error(app.config.SERVER_ERROR, 500);
    }
    return this.success(result, "登录成功!");
  }
}

module.exports = AdminController;
