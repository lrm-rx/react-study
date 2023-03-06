"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");
const citys = require("./data/citys");

class commonController extends BaseController {
  async citys() {
    this.success(citys);
  }
}
module.exports = commonController;
