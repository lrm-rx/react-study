module.exports = (options) => {
  return async (ctx, next) => {
    const { referer } = ctx.request.header;
    if (referer) {
      const ulr = new URL(referer);
      if (options.includes(url.host)) {
        await next();
      } else {
        ctx.body = {
          status: 403,
          errMsg: `主机: ${url.host} 被禁止访问!`,
        };
      }
    } else {
      await next();
    }
  };
};
