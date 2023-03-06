module.exports = (options) => {
  return async (ctx, next) => {
    const { referer } = ctx.request.header;
    if (referer) {
      const url = new URL(referer);
      // console.log("url.host:", url.host);
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
