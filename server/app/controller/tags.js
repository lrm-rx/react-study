const { Controller } = require("egg");
const BaseController = require("./base");

class TagsController extends BaseController {
  async list() {
    const { ctx, app, service } = this;
    const {
      page = app.config.PAGE,
      pageSize = app.config.PAGE_SIZE,
      tagName = "",
    } = ctx.request.query;
    const data = {
      page: ctx.helper.escape(page),
      pageSize: ctx.helper.escape(pageSize),
      tagName: ctx.helper.escape(tagName),
    };

    try {
      this._validate(
        [
          {
            page: [
              { type: "tags-page" },
              { required: false },
              { allowEmpty: true },
            ],
            pageSize: [
              { type: "tags-pageSize" },
              { required: false },
              { allowEmpty: true },
            ],
            tagName: [
              { type: "tags-name" },
              { required: false },
              { allowEmpty: true },
            ],
          },
        ],
        data
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.tags.list(data);
    ctx.body = result;
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
            tagName: [{ type: "tags-name" }],
          },
        ],
        params
      );
    } catch (error) {
      return this.error(error?.errors);
    }
    const result = await service.tags.create(params);
    switch (result) {
      case app.config.DATA_EXIST:
        this.error("该标签已存在");
        break;
      case app.config.SERVER_ERROR:
        this.error(app.config.SERVER_ERROR, 500);
        break;
      case app.config.ADD_OK:
        this.success("", "添加标签成功!");
        break;
      default:
        break;
    }
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
            tagName: [{ type: "tags-name" }],
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
      case app.config.SERVER_ERROR:
        this.error(app.config.SERVER_ERROR, 500);
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
  async updateStatus() {
    const { ctx, app, service } = this;
    const status = ctx.helper.escape(ctx.request.body?.status);
    const id = ctx.helper.escape(ctx.params.id);
    const result = await service.tags.updateStatus({
      id,
      status,
    });
    if (result === app.config.SERVER_ERROR) {
      return this.error(app.config.SERVER_ERROR, 500);
    }
    this.success(result, `标签${result.status ? "启用" : "停用"}`);
  }
}

module.exports = TagsController;
