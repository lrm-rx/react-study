const { Controller } = require("egg");

class CategoriesController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 10,
      },
      name: {
        type: "string",
        min: 2,
        max: 20,
        required: false,
        allowEmpty: true,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
    };

    this.createRule = {
      name: {
        type: "string",
        min: 2,
        max: 20,
        required: true,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
    };
  }

  // 分类列表
  async index() {
    const { ctx, app, service } = this;
    const {
      page = app.config.PAGE,
      pageSize = app.config.PAGE_SIZE,
      name = "",
    } = ctx.request.query;
    const data = {
      page: ctx.helper.escape(page),
      pageSize: ctx.helper.escape(pageSize),
      name: ctx.helper.escape(name),
    };
    ctx.validate(this.queryListParamsRules, ctx.request.query);
    const result = await service.categories.index(data);
    ctx.helper.success({
      ctx,
      result,
    });
  }

  // 添加分类
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const params = {
      name: ctx.helper.escape(data?.name),
    };
    const result = await service.categories.create(params);
    ctx.helper.success({
      ctx,
      result,
    });
  }

  // 删除分类
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.helper.escape(ctx.params?.id);
    const result = await service.categories.destroy(id);
    ctx.helper.success({
      ctx,
      result,
    });
  }

  // 修改分类
  async update() {
    const { ctx, service } = this;
    const name = ctx.helper.escape(ctx.request.body?.name);
    const id = ctx.helper.escape(ctx.params?.id);
    ctx.validate(this.createRule, ctx.request.body);
    const result = await service.categories.update({
      id,
      name,
    });
    ctx.helper.success({
      ctx,
      result,
    });
  }
}

module.exports = CategoriesController;
