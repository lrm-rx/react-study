"use strict";

const { Service } = require("egg");
const BaseService = require("./base");

class CommentService extends BaseService {
  async add(params) {
    return this.serviceRun(async () => {
      const { ctx } = this;
      return await ctx.model.Comment.create(params);
    });
  }
  async list(params, userId) {
    return this.serviceRun(async (ctx, app) => {
      const result = await ctx.model.Comment.findAll({
        where: {
          houseId: params.id,
          userId,
        },
        order: [["createTime", "DESC"]],
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.User,
            attributes: ["avatar", "username"],
          },
        ],
      });
      return result;
    });
  }
}

module.exports = CommentService;
