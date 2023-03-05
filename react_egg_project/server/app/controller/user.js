"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");

class UserController extends BaseController {
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
}
module.exports = UserController;
