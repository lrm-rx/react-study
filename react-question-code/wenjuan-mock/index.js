const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();

async function getRes(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn();
      resolve(res);
    }, 1000);
  });
}

// 注册 mock 服务
mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    // const res = response();
    const res = await getRes(response);
    ctx.body = res;
  });
});

app.use(router.routes());
app.listen(3006, () => {
  console.log("3006端口启动成功!");
});
