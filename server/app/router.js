module.exports = (app) => {
  const { router, controller, jwt } = app;
  const baseRouterUrl = app.config.baseRouterUrl;
  router.get(`${baseRouterUrl}/admin/list`, controller.admin.list);
  router.del(`${baseRouterUrl}/admin/delete/:id`, controller.admin.del);
  router.post(`${baseRouterUrl}/admin/login`, controller.admin.login);
  router.post(`${baseRouterUrl}/admin/logout`, controller.admin.logout);
  // 标签管理
  router.get(`${baseRouterUrl}/tags/list`, jwt, controller.tags.list);
  router.post(`${baseRouterUrl}/tags/create`, jwt, controller.tags.create);
  router.post(`${baseRouterUrl}/tags/edit/:id`, jwt, controller.tags.edit);
  router.post(`${baseRouterUrl}/tags/del/:id`, jwt, controller.tags.del);
  // 标签-修改状态
  router.post(`${baseRouterUrl}/tags/status/:id`, controller.tags.updateStatus);
  // 分类 jwt
  router.resources(
    "categories",
    `${baseRouterUrl}/categories`,
    controller.categories
  ); // 分类
};
