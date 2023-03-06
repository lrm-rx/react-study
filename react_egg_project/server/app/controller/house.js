"use strict";

const { Controller } = require("egg");
const BaseController = require("./base");

class HouseController extends BaseController {
  async hot() {
    const { ctx, service } = this;
    const result = await service.house.hot();
    this.success(result);
  }

  async search() {
    const { ctx, service } = this;
    const result = await service.house.search(ctx.params());
    this.success(result);
  }

  async detail() {
    const { ctx, service } = this;
    const result = await service.house.detail(ctx.params("id"));

    this.success({
      info: result,
      banner: result.imgs,
    });
  }
}
module.exports = HouseController;
