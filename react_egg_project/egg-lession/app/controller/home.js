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
}

module.exports = HomeController;
