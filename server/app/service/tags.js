const { Service } = require("egg");
const BaseService = require("./base");

class TagsService extends BaseService {
  async list() {
    const result = await this._find("AdmiTagsn");
    const total = await this._count("Tags");
    return { data: result, total };
  }
  async create(data) {
    const { ctx } = this;
    const checkData = {
      tagName: data.tagName,
    };
    const params = {
      ...checkData,
      createTime: ctx.helper.dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    return await this._add("Tags", params, true, checkData);
  }
  async edit(id, data) {
    const { ctx, app } = this;
    const result = await this._findById("Tags", { _id: id });
    if (result && result !== app.config.NO_DATA) {
      const oldTagName = await this._findOne("Tags", data);
      if (oldTagName) {
        return app.config.DATA_EXIST;
      }
      const updateData = {
        updateTime: ctx.helper.dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        tagName: data.tagName,
      };
      const res = await ctx.model.Tags.updateOne(
        {
          _id: id,
        },
        updateData
      );
      return await this._findById("Tags", { _id: id });
    }
    return app.config.DATA_NO_EXIST;
  }
  async del(id) {
    const { ctx, app } = this;
    const result = await this._findById("Tags", { _id: id });
    if (result === app.config.NO_DATA) {
      return app.config.DATA_NO_EXIST;
    }
    await ctx.model.Tags.deleteOne({
      _id: id,
    });
  }
}

module.exports = TagsService;
