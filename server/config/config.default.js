const userConfig = require("./config.user");

module.exports = (appInfo) => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "31249a23-36dd-45a9-aee0-66c75b093cac";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  // const userConfig = {
  //   // myAppName: 'egg',
  // };

  // 忽略csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    url: "mongodb://127.0.0.1:27017/blog", // 腾讯云
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };

  config.validate = {
    // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
    widelyUndefined: true, // widelyUndefined 开启后，会把空字符串，NaN,null 这些转成 undefined
  };

  config.jwt = {
    secret: userConfig.uuid,
  };

  return {
    ...config,
    ...userConfig,
  };
};
