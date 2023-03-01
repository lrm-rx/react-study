const { Service } = require("egg");

class BaseService extends Service {
  // 查询数据
  async _findAll(modelName) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].find();
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 查询数据(分页)
  async _findByPaging(modelName, params, { page, pageSize }) {
    const { ctx } = this;
    page = page * 1;
    pageSize = pageSize * 1;
    const totalCount = await ctx.model[modelName].find(params).countDocuments();
    const data = await ctx.model[modelName]
      .find(params)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return { page, pageSize, totalCount, list: data };
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

  // 根据ID查询数据 该方法没有找到数据时会抛出异常
  async _findById(modelName, id) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].findById(id);
    } catch (error) {
      return app.config.NO_DATA;
    }
  }
  // 查询数据
  async _findOne(modelName, json) {
    const { ctx, app } = this;
    try {
      return await ctx.model[modelName].findOne({ ...json });
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 添加数据
  async _add(modelName, json, isCheck = false, checkData) {
    const { ctx, app } = this;
    try {
      if (isCheck) {
        const result = await ctx.model[modelName].findOne({ ...checkData });
        if (result) {
          return "该数据已经存在!";
        }
      }
      await ctx.model[modelName].create(json);
      return "操作成功!";
    } catch (error) {
      return app.config.SERVER_ERROR;
    }
  }

  // 编辑数据
  async _update(modelName, id, data, isCheckRepeat = false) {
    const { ctx, app } = this;
    try {
      const result = await this._findById(modelName, id);
      if (result && result !== app.config.NO_DATA) {
        if (isCheckRepeat) {
          const oldName = await this._findOne(modelName, data);
          if (oldName) {
            return app.config.DATA_EXIST;
          }
        }
        const updateData = {
          updateTime: ctx.helper
            .dayjs(new Date())
            .format("YYYY-MM-DD HH:mm:ss"),
          ...data,
        };
        const res = await ctx.model[modelName].updateOne(
          {
            _id: id,
          },
          updateData
        );
        // 返回修改的数据
        return await this._findById(modelName, id);
      }
      return app.config.DATA_NO_EXIST;
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
