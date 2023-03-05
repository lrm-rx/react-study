module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    // const user = ctx.session.user;
    const token = ctx.request.token;
    const username = await ctx.app.redis.get(ctx.username);
    const user = username ? username === token : username;

    if (!user && !options.exclude.includes(ctx.request.url.split("?")[0])) {
      ctx.body = {
        status: 1001,
        errorMsg: "用户没有登录",
      };
    } else {
      await next();
    }
  };
};
