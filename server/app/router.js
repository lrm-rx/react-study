"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const baseRouterUrl = app.config.baseRouterUrl;
  router.get("/", controller.home.index);
  router.get(`${baseRouterUrl}/admin/list`, controller.admin.list);
  router.del(`${baseRouterUrl}/admin/delete/:id`, controller.admin.del);
  router.post(`${baseRouterUrl}/admin/login`, controller.admin.login);
};
