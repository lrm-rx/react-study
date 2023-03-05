const { Service } = require("egg");

class BaseService extends Service {
  serviceRun(callback) {
    const { ctx, app } = this;
    try {
      return callback && callback(ctx, app);
    } catch (error) {
      console.error("出错了");
      return null;
    }
  }
}

module.exports = BaseService;
