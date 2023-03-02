const { Service } = require("egg");

class AboutService extends Service {
  async index() {
    const { ctx } = this;
    const result = await ctx.model.About.findOne();
    return {
      msg: "关于信息获取成功",
      data: result,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.dayjs().unix(),
    };
    const oldDataCount = await ctx.model.About.find({}).countDocuments();
    if (oldDataCount === 0) {
      const result = await ctx.model.About.create(data);
      return {
        msg: "关于信息添加成功",
        data: result,
      };
    }
    return {
      msg: "关于信息已存在",
    };
  }

  async update(params) {
    const { ctx } = this;
    const oldData = await ctx.model.About.findOne({
      _id: params.id,
    });
    console.log("object:", oldData);
    if (oldData) {
      const updateData = {
        ...params,
        updateTime: ctx.helper.dayjs().unix(),
      };
      const result = await ctx.model.About.findByIdAndUpdate(
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
        msg: "关于信息修改成功",
        data: result,
      };
    }
    return {
      msg: "关于信息不存在",
    };
  }
}

module.exports = AboutService;
