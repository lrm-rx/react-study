"use strict";

const { Controller } = require("egg");
const BaseController = require("./base");

class CommentController extends BaseController {
  async add() {
    const { ctx, service } = this;
    const user = await service.user.getUser(ctx.username);
    const result = await service.comment.add({
      userId: user.id,
      houseId: ctx.params("houseId"),
      msg: ctx.params("comment"),
      createTime: ctx.helper.time(),
    });

    this.success(result);
  }

  async list() {
    const { ctx, service } = this;
    const user = await service.user.getUser(ctx.username);
    const result = await service.comment.list(ctx.params(), user.id);

    this.success(result);
  }
}
module.exports = CommentController;
