"use strict";

const { Service } = require("egg");
const BaseService = require("./base");
const md5 = require("md5");

class UserService extends BaseService {
  // 获取用户信息
  async getUser(username, password) {
    return this.serviceRun(async () => {
      const { ctx, app } = this;
      const _where = password
        ? { username, password: md5(password + app.config.salt) }
        : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }
  // 注册
  async register(params) {
    return this.serviceRun(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }
  // 编辑
  async edit(params) {
    return this.serviceRun(async () => {
      try {
        const { ctx } = this;
        return await ctx.model.User.update(params, {
          where: {
            username: ctx.username,
          },
        });
      } catch (error) {
        console.error("edit", error);
        return null;
      }
    });
  }
}

module.exports = UserService;
