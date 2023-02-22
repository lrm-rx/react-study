"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = "user index";
    await ctx.render(
      "user.html",
      {
        id: 100,
        username: "xiaoming",
        lists: ["vue", "react", "ts"],
      },
      {
        delimiter: "%",
      }
    );
  }

  async lists() {
    const { ctx } = this;
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    ctx.body = [{ id: 123 }];
  }

  async detail() {
    const { ctx, service } = this;
    const result = await service.user.detail(ctx.params.id);
    ctx.body = result;
    // ctx.body = ctx.params.id;
  }

  async detail2() {
    const { ctx } = this;
    ctx.body = ctx.query.id;
  }

  async add() {
    const { ctx } = this;
    const rule = {
      id: { type: "number" },
      username: { type: "string" },
    };
    ctx.validate(rule);
    ctx.body = {
      status: 200,
      data: ctx.request.body,
    };
  }

  async edit() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async del() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }
}
module.exports = UserController;
