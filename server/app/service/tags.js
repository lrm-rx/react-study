const { Service } = require("egg");
const BaseService = require("./base");

class TagsService extends BaseService {
  async list(params) {
    const { ctx } = this;
    const data = ctx.helper.filterEmptyField(params);
    const queryParam = data.tagName
      ? {
          tagName: {
            $regex: new RegExp(data.tagName, "i"),
          },
        }
      : {};
    return this._findByPaging("Tags", queryParam, {
      page: params.page,
      pageSize: params.pageSize,
    });
  }
  async create(data) {
    const { ctx } = this;
    const checkData = {
      tagName: data.tagName,
    };
    const params = {
      ...checkData,
      createTime: ctx.helper.dayjs().unix(),
    };
    return await this._add("Tags", params, true, checkData);
  }
  async edit(id, data) {
    const updateData = {
      tagName: data.tagName,
    };
    return await this._update("Tags", id, updateData, true);
  }
  async del(id) {
    const { ctx, app } = this;
    const result = await this._findById("Tags", id);
    if (result === app.config.NO_DATA) {
      return app.config.DATA_NO_EXIST;
    }
    await ctx.model.Tags.deleteOne({
      _id: id,
    });
  }
  async updateStatus({ id, status }) {
    const { ctx, app } = this;
    const result = await this._findById("Tags", id);
    if (result === app.config.NO_DATA) {
      return app.config.DATA_NO_EXIST;
    }
    const updateData = {
      status,
    };
    return await this._update("Tags", id, updateData);
  }
}

module.exports = TagsService;
