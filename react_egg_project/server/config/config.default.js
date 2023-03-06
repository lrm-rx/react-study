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
    salt: "cf336cab-0d0c-4571-9012-0090d2e73950",
    redisExpire: 60 * 60 * 24,
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

  config.auth = {
    exclude: ["/api/user/login", "/api/user/register", "/api/commons/citys"],
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "756131502",
      database: "egg",
    },
  };

  exports.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    database: "egg_house",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "756131502",
    define: {
      timestamps: false, // false时, 不需要sequelize生成相关时间字段
      freezeTableName: true, // true时, 使用自定义的表名
      underscored: false, // 将字段命名以驼峰修改为 _
    },
  };

  config.jwt = {
    secret: "cf336cab-0d0c-4571-9012-0090d2e73950",
  };

  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "",
      db: 0,
    },
  };

  // 限制访问的主机
  config.allowHosts = [
    "localhost:8000",
    "127.0.0.1:8000",
    "localhost:8001",
    "127.0.0.1:8001",
    "localhost:8002",
    "127.0.0.1:8002",
    "localhost:8003",
    "127.0.0.1:8003",
  ];

  // 限制请求的频率
  config.interfaceLimit = {
    maxCount: 30, // 最大请求个数
    time: 6 * 1000, // 间隔时间
  };

  config.interfaceCache = {
    expire: 10,
    include: ["/api/user/detail"],
  };

  return {
    ...config,
    ...userConfig,
  };
};
