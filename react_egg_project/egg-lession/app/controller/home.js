"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      id: 100,
      username: "theshy",
    };
  }

  async newApplication() {
    const { ctx, app } = this;
    const packageInfo = app.package("scripts");
    const allPack = app.appPackage;
    ctx.body = {
      packageInfo,
      allPack,
    };
  }

  async newContext() {
    const { ctx } = this;
    const ps = ctx.params();
    ctx.body = ps;
  }

  async newRequest() {
    const { ctx } = this;
    const token = ctx.request.token;
    ctx.body = token;
  }

  async newResponse() {
    const { ctx } = this;
    ctx.response.token = "abc456abc";
    const base64Parse = ctx.helper.base64Encode("newResponse");
    ctx.body = base64Parse;
  }
}

module.exports = HomeController;
