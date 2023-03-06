"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");

class UserController extends BaseController {
  // jwt签名
  async jwtSign({ id, username }) {
    const { ctx, app } = this;
    const token = app.jwt.sign(
      {
        id,
        username,
      },
      app.config.jwt.secret
    );
    await app.redis.set(username, token, "EX", app.config.redisExpire);
    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["password"]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  // 注册
  async register() {
    const { ctx, app, service } = this;
    const params = ctx.params();
    const user = await service.user.getUser(params.username);

    if (user) {
      return this.error("用户已经存在!");
    }
    const result = await service.user.register({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });

    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username,
      });
      this.success({
        ...this.parseResult(ctx, result),
        token,
      });
    } else {
      this.error("注册失败");
    }
  }

  // 登录
  async login() {
    const { ctx, app, service } = this;
    const { username, password } = ctx.params();
    const user = await service.user.getUser(username);

    if (user) {
      if (user.password !== md5(password + app.config.salt)) {
        return this.error("用户名或密码不正确!");
      }
      const token = await this.jwtSign({
        id: user.id,
        username: user.username,
      });
      this.success({
        ...this.parseResult(ctx, user),
        token,
      });
    } else {
      this.error("用户不存在, 请先注册!");
    }
  }

  // 编辑信息
  async edit() {
    const { ctx, service } = this;
    const result = service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
      sign: ctx.helper.escape(ctx.params("sign")),
    });
    this.success(result);
  }

  // 用户详情信息
  async detail() {
    const { ctx, service } = this;
    const user = await service.user.getUser(ctx.username);

    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
      });
    } else {
      this.error("该用户不存在!");
    }
  }

  // 退出登录
  async logout() {
    const { ctx, app } = this;
    try {
      await app.redis.del(ctx.username);
      this.success("ok");
    } catch (error) {
      this.error("退出登录失败!");
    }
  }
}
module.exports = UserController;
