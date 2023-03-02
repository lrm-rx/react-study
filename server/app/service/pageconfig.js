const { Service } = require("egg");

class PageConfigService extends Service {
  async index() {
    const { ctx } = this;
    const result = await ctx.model.Pageconfig.findOne();
    return {
      msg: "配置信息获取成功",
      data: result,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.dayjs().unix(),
    };
    const oldDataCount = await ctx.model.Pageconfig.find({}).countDocuments();
    if (oldDataCount === 0) {
      const result = await ctx.model.Pageconfig.create(data);
      return {
        msg: "配置信息添加成功",
        data: result,
      };
    }
    return {
      msg: "配置信息已存在",
    };
  }

  async update(params) {
    const { ctx } = this;
    const oldData = await ctx.model.Pageconfig.findOne({
      _id: params.id,
    });
    if (oldData) {
      const updateData = {
        ...params,
        createTime: oldData.createTime,
        updateTime: ctx.helper.dayjs().unix(),
      };
      const result = await ctx.model.Pageconfig.findByIdAndUpdate(
        {
          _id: params.id,
        },
        updateData,
        {
          new: true, // 返回修改后的数据。
          runValidators: true, // 如果值为true，执行Validation验证。
        }
      );
      return {
        msg: "配置信息修改成功",
        data: result,
      };
    }
    return {
      msg: "配置信息不存在",
    };
  }
}

module.exports = PageConfigService;
