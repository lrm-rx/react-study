"use strict";

const { Service } = require("egg");

class UserService extends Service {
  async detail(id) {
    return {
      id,
      username: "xiaohu",
      age: 24,
    };
  }
}

module.exports = UserService;
