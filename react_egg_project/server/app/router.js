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
  router.post("/api/house/search", controller.house.search);
  router.post("/api/house/detail", controller.house.detail);
  router.post("/api/comments/add", controller.comment.add);
  router.post("/api/comments/lists", controller.comment.list);
  router.post("/api/orders/hasOrder", userExist, controller.orders.hasOrder);
  router.post("/api/orders/addOrder", userExist, controller.orders.addOrder);
  router.post("/api/orders/delOrder", userExist, controller.orders.delOrder);
  router.post("/api/orders/lists", userExist, controller.orders.lists);
  router.post("/api/orders/pay", userExist, controller.orders.pay);
};
