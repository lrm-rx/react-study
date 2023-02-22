"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/newapplication", controller.home.newApplication);
  router.get("/newcontent", controller.home.newContext);
  router.get("/newrequest", controller.home.newRequest);
  router.get("/newresponse", controller.home.newResponse);
  router.get("/user", controller.user.index);
  router.get("/user/lists", controller.user.lists);
  router.get("/user/detail/:id", controller.user.detail);
  router.get("/user/detail2", controller.user.detail2);
  router.post("/user/add", controller.user.add);
  router.post("/user/edit", controller.user.edit);
  router.del("/user/del", controller.user.del);

  router.post("/user/login", controller.user.login);
  router.post("/user/logout", controller.user.logout);
  router.get("/curl/get", controller.curl.curlGet);
  router.post("/curl/post", controller.curl.curlPost);
};
