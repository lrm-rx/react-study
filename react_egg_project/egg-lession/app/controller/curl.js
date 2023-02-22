const { Controller } = require("egg");

class CurlController extends Controller {
  async curlGet() {
    const { ctx, app } = this;
    const res = await ctx.curl("http://localhost:7001/", {
      dataType: "json",
    });
    console.log("res:", res);
    ctx.body = res.data;
  }

  async curlPost() {
    const { ctx, app } = this;
    const { data } = await ctx.curl("http://localhost:7001/user/login", {
      method: "post",
      contentType: "json",
      data: ctx.request.body,
      dataType: "json",
    });

    ctx.body = data;
  }
}
module.exports = CurlController;
