"use strict";

const { Service } = require("egg");

class BaseService extends Service {
  // 查询数据
  async _find(modelName) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].find();
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 查询数据总数
  async _count(modelName) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].count();
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 根据ID查询数据
  async _findById(modelName, id) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].findById(id);
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  async _findOne(modelName, json) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].findOne({ ...json });
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 添加数据
  async _add(modelName, json) {
    const { ctx, app } = this;
    try {
      await ctx.model[modelName].create(json);
      return "操作成功!";
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 编辑数据
  async _update(modelName, json) {
    const { ctx, app } = this;
    try {
      const result = await ctx.model[modelName].findById(json.id);
      if (!result) {
        return false;
      }
      const res = await result.updateOne({ _id: json.id }, { ...json });
      return true;
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 删除数据
  async _delete(modelName, id) {
    const { ctx, app } = this;
    try {
      const result = await ctx.model[modelName].findById(id);
      if (!result) return false;
      await result.deleteOne({ _id: id });
      return true;
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }
}

module.exports = BaseService;
