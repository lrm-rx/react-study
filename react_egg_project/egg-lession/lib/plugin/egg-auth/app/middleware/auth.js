module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const user = ctx.session.user;
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
