"use strict";

const { Controller } = require("egg");
const BaseController = require("./base");

class OrderController extends BaseController {
  async lists() {
    const { ctx, service } = this;
    const result = await service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    this.success(result);
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    };
  }

  async pay() {
    const { ctx, app } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);

    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
        });
        this.success(result);
      } catch (error) {
        this.error("订单支付失败");
      }
    } else {
      this.error("订单不存在");
    }
  }
  async hasOrder() {
    const { ctx, service } = this;
    const result = await service.orders.hasOrder({
      userId: ctx.userId,
      houseId: ctx.params("id"),
    });

    this.success(result);
  }

  async addOrder() {
    const { ctx, service } = this;
    const result = await service.orders.addOrder({
      userId: ctx.userId,
      houseId: ctx.params("id"),
      isPayed: 0,
      createTime: ctx.helper.time(),
    });

    this.success(result);
  }

  async delOrder() {
    const { ctx, service } = this;
    const result = await service.orders.delOrder(ctx.params("id"));
    this.success(result);
  }
}
module.exports = OrderController;
