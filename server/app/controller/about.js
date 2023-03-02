const { Controller } = require("egg");

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.rule = {
      desc: {
        type: "string",
        min: 1,
        max: 1000,
      },
      tags: {
        type: "array",
        itemType: "object",
        min: 1,
        max: 20,
        rule: {
          tagName: "string",
        },
      },
    };
  }
  async index() {
    const { ctx, service } = this;
    const result = await service.about.index();
    ctx.helper.success({
      ctx,
      result,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.rule, data);
    const result = await service.about.create(data);
    ctx.helper.success({
      ctx,
      result,
    });
  }
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    // 保存数据的准确性, 但如果这样做会需要前端把所有校验的值都传给接口
    ctx.validate(this.rule, data);
    const result = await service.about.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      result,
    });
  }
  async destroy() {
    const { ctx } = this;
    ctx.body = "删除操作!";
  }
}

module.exports = AboutController;
