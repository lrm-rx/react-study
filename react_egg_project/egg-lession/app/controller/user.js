"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
  encode(str = "") {
    return new Buffer(str).toString("base64");
  }
  decode(str = "") {
    return new Buffer(str, "base64").toString();
  }
  async index() {
    const { ctx } = this;
    // 获取session
    const session = ctx.session.user;
    console.log("session:", session);
    // session可以直接设置为中文
    const zhSession = ctx.session.zh;
    console.log("zhSession:", zhSession);
    // cookies不能直接设置为中文, 需要加密 await 保证后面可以获取到
    await ctx.cookies.set("zh", "测试", {
      encrypt: true,
    });
    const zh = ctx.cookies.get("zh", {
      encrypt: true,
    });
    // console.log("cookie:", zh);

    await ctx.cookies.set("base64", this.encode("中文base64"));
    const base64 = this.decode(ctx.cookies.get("base64"));

    // ctx.body = "user index";
    const user = ctx.cookies.get("user", {
      encrypt: true,
    });
    await ctx.render(
      "user.html",
      {
        id: 100,
        username: "xiaoming",
        lists: ["vue", "react", "ts"],
        user: user ? JSON.parse(user) : null,
        zh,
        base64,
      },
      {
        delimiter: "%",
      }
    );
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.cookies.set("user", JSON.stringify(body), {
      maxAge: 1000 * 60 * 10,
      httpOnly: false, // 是否只允许服务端操作cookie
      encrypt: true, // 加密
    });

    // 保存session
    ctx.session.user = body;
    ctx.session.zh = "中文测试";

    ctx.body = {
      status: 200,
      data: body,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.cookies.set("user", null);
    // 清除session
    ctx.session.user = null;
    ctx.body = {
      status: 200,
    };
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
