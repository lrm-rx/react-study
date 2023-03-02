const { Controller } = require("egg");

class PageConfigController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      // header
      logo: {
        type: "string",
        required: false,
      },
      title: {
        type: "string",
        required: false,
        max: 20,
      },
      openSearch: {
        type: "boolean",
        default: true,
      },
      login: {
        type: "boolean",
        default: false,
      },
      register: {
        type: "boolean",
        default: false,
      },
      // main
      salutation: {
        type: "string",
        min: 2,
        max: 100,
      },
      effects: {
        type: "boolean",
        default: false,
      },
      archiveBgImg: {
        type: "string",
      },
      categoriesBgImg: {
        type: "string",
      },
      aboutBgImgs: {
        type: "array",
        itemType: "object",
        min: 1,
        max: 3,
        rule: {
          imgUrl: "string",
        },
      },
      tagsBgImg: {
        type: "string",
      },
      // footer
      copyright: {
        type: "string",
        min: 1,
        max: 200,
      },
      extra: {
        type: "string",
        min: 1,
        max: 200,
      },
    };
  }
  async index() {
    const { ctx, service } = this;
    const result = await service.pageconfig.index();
    ctx.helper.success({
      ctx,
      result,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const result = await service.pageconfig.create(data);
    ctx.helper.success({
      ctx,
      result,
    });
  }
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const result = await service.pageconfig.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      result,
    });
  }
}

module.exports = PageConfigController;
