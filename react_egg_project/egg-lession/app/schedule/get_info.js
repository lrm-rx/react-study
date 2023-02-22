const { Subscription } = require("egg");

class getInfo extends Subscription {
  static get schedule() {
    return {
      // interval: 3000,
      cron: "*/5 * * * * *",
      type: "worker",
    };
  }

  async subscribe() {
    const info = this.ctx.info;
    // console.log("info:", Date.now(), info);
  }
}

module.exports = getInfo;
