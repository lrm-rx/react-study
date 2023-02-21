"use strict";

const { Controller } = require("egg");
// const info = require("../utils/info");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 在utils中定义方法
    // ctx.body = info();
    // 将 方法挂载到 context(ctx) 上, 在 extend/context中
    ctx.body = ctx.info;
  }

  async demo() {
    const { ctx } = this;
    ctx.body = ctx.info;
  }
}

module.exports = HomeController;
