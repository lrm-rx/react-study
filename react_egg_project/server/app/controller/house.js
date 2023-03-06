"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");
const citys = require("./data/citys");

class HouseController extends BaseController {
  async hot() {
    const { ctx, service } = this;
    const result = await service.house.hot();
    this.success(result);
  }

  async search() {
    const { ctx, service } = this;
    // const result = await service.house.search(ctx.params());
    this.success(ctx.params());
  }
}
module.exports = HouseController;
