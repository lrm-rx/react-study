/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1677001663702_5408";

  // add your middleware config here
  config.middleware = ["httpLog"];

  config.httpLog = {
    type: "all",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    mapping: {
      ".html": "ejs",
    },
    root: [
      path.join(appInfo.baseDir, "app/html"),
      path.join(appInfo.baseDir, "app/view"),
    ].join(","),
  };

  config.ejs = {
    delimiter: "%", // 默认为%(不配置)
  };

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets"),
  };

  config.session = {
    key: "RM-SESS",
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    // encrypt: true,
    renew: true, // maxAge / 2时会刷新
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
