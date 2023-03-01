const { Controller } = require("egg");
const BaseController = require("./base");

class TagsController extends BaseController {
  async list() {
    const { ctx, app, service } = this;
    const data = ctx.request.query;
    // const result = await service.tags.list();
    // if (
    //   result.data === app.config.SERVER_ERROR ||
    //   result.total === app.config.SERVER_ERROR
    // ) {
    //   return this.error(app.config.SERVER_ERROR, 500);
    // }
    // return this.success(result.data, "查询成功!");
  }

  // 新增标签
  async create() {
    const { ctx, app, service } = this;
    const { body } = ctx.request;
    const params = {
      tagName: ctx.helper.escape(body.tagName),
    };
    try {
      // 当传递空值时, 似乎不走自定义规则
      this._validate(
        [
          {
            tagName: [{ type: "tags-create-name" }],
          },
        ],
        params
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.tags.create(params);
    this.success("", result);
  }

  async edit() {
    const { ctx, app, service } = this;
    const { body } = ctx.request;
    const id = ctx.helper.escape(ctx.params.id);
    const params = {
      tagName: ctx.helper.escape(body.tagName),
    };
    try {
      // 当传递空值时, 似乎不走自定义规则
      this._validate(
        [
          {
            tagName: [{ type: "tags-create-name" }],
          },
        ],
        params
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.tags.edit(id, params);
    switch (result) {
      case app.config.DATA_EXIST:
        this.error("该标签已存在");
        break;
      case app.config.DATA_NO_EXIST:
        this.error("该标签不存在");
        break;
      default:
        this.success(result, "修改成功!");
        break;
    }
  }
  async del() {
    // todo 如果文章应用了标签, 则不可以删除
    const { ctx, app, service } = this;
    const id = ctx.helper.escape(ctx.params?.id);
    const result = await service.tags.del(id);
    result === app.config.DATA_NO_EXIST
      ? this.error("该标签不存在")
      : this.success("", "修改成功!");
  }

  // async login() {
  //   const { ctx, app, service } = this;
  //   const { body } = ctx.request;
  //   try {
  //     this._validate(
  //       [{ username: "tags-username" }, { password: "tags-password" }],
  //       ctx.request.body
  //     );
  //   } catch (error) {
  //     return this.error(error?.errors);
  //   }
  //   const result = await service.tags.login(ctx.request.body);
  //   if (result === app.config.SERVER_ERROR) {
  //     return this.error(app.config.SERVER_ERROR, 500);
  //   }
  //   return this.success(result, "登录成功!");
  // }
  // async logout() {
  //   const { ctx, service } = this;
  //   const result = await service.tags.logout();
  //   return this.success("", result);
  // }
}

module.exports = TagsController;
