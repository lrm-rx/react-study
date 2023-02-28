"use strict";

const { Service } = require("egg");
const BaseService = require("./base");

class AdminService extends BaseService {
  async list() {
    const result = await this._find("Admin");
    const total = await this._count("Admin");
    return { data: result, total };
  }
  async login(params) {
    const { app, ctx } = this;
    const up = {
      username: ctx.helper.escape(params.username),
      password: ctx.helper.escape(params.password),
    };
    const userInfo = await this._findOne("Admin", { username: up.username });
    if (!userInfo) {
      return {
        msg: "用户不存在!",
      };
    }
    const isMatch = await ctx.helper.comparePassword(
      up.password,
      userInfo.password
    );
    if (!isMatch) {
      return {
        msg: "用户名或密码错误!",
      };
    }

    // 生成token
    const token = app.jwt.sign(
      {
        ...userInfo,
      },

      app.config.jwt.secret,
      {
        expiresIn: "1h",
      }
    );

    // 登录成功后设置cookie
    ctx.cookies.set("token", token, {
      maxAge: "1d", // 一天过期时间
      httpOnly: true, // 是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      userInfo,
      token,
    };
  }
  async del(id) {
    try {
      const { app, ctx } = this;
      return await ctx.model.Admin.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = AdminService;
