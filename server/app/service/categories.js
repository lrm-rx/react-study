const { Service } = require("egg");

class CategoriesService extends Service {
  // 分类列表
  async index(params) {
    const { ctx, app } = this;

    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const queryParam = params.name
      ? {
          name: { $regex: new RegExp(params.name, "i") },
        }
      : {};
    const totalCount = await ctx.model.Categories.find(
      queryParam
    ).countDocuments();
    const data = await ctx.model.Categories.find(queryParam)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
      msg: "列表获取成功!",
    };
  }

  // 添加分类
  async create(params) {
    const { ctx } = this;
    const oldData = await ctx.model.Categories.findOne({
      name: params.name,
    });
    if (oldData) {
      return {
        msg: "该分类已存在!",
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.dayjs().unix(),
    };
    const res = await ctx.model.Categories.create(data);
    return {
      msg: "添加成功!",
      data: res,
    };
  }

  // 删除分类
  async destroy(id) {
    const { ctx } = this;

    const oldData = await ctx.model.Categories.findOne({
      _id: id,
    });
    if (!oldData) {
      return {
        msg: "分类不存在!",
      };
    }

    await ctx.model.Categories.deleteOne({
      _id: id,
    });
    return {
      msg: "删除成功!",
    };
  }

  // 修改分类
  async update(params) {
    const { ctx } = this;

    const oldIdCategories = await ctx.model.Categories.findOne({
      _id: params.id,
    });

    if (oldIdCategories) {
      const oldNameCategories = await ctx.model.Categories.findOne({
        name: params.name,
      });
      if (oldNameCategories) {
        return {
          msg: "分类已存在，请重新编辑!",
        };
      }
    } else {
      return {
        msg: "分类不存在!",
      };
    }

    const updateData = {
      updateTime: ctx.helper.dayjs().unix(),
      name: params.name,
    };
    await ctx.model.Categories.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "修改成功!",
    };
  }
}

module.exports = CategoriesService;
