"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.post("/api/user/register", controller.user.register);
  router.post("/api/user/login", controller.user.login);
  router.post("/api/user/edit", userExist, controller.user.edit);
  router.post("/api/user/detail", controller.user.detail);
  router.post("/api/user/logout", controller.user.logout);
  router.post("/api/commons/citys", controller.commons.citys);
  router.post("/api/house/hot", controller.house.hot);
  router.get("/api/house/search", controller.house.search);
};
