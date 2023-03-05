/** 缓存接口
 * 1.接口地址作为redis中的key
 * 2.查询redis, 有缓存,返回接口
 * 3. 没有缓存,将接口返回接口保存到redis中
 *
 */
module.exports = (options) => {
  return async (ctx, next) => {
    const { url } = ctx.request;
    const cache = await ctx.app.redis.get(url);

    if (options.include.includes(url)) {
      if (cache) {
        ctx.body = JSON.parse(cache);
        return;
      }
      await next();
      await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), "EX", 8);
    } else {
      await next();
    }
  };
};
