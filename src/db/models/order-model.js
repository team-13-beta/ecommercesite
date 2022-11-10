import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema.js";
import { timeZone } from "../../services/timeZone.js";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }
  async findByUsers(consumerId) {
    const orderByUser = await Order.find({ userId: consumerId });
    return orderByUser;
  }

  async findByOrderId(Id) {
    let ordId = Number(Id);
    const findorder = await Order.findOne({ orderId: ordId });
    if (findorder == null)
      throw new Error("찾고계신 주문번호는 존재하지 않습니다. ");
    return findorder;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }
  async create(orderInfo) {
    const num2 = await Order.find().sort({ orderId: -1 }).limit(1);
    console.log(num2);
    // Order Id 생성
    const orderId = num2[0] ? num2[0].orderId + 1 : 1;
    console.log(orderId);
    const time = timeZone();
    const timeInfo = { createdTime: time, updatedTime: time };
    const info = { orderId, ...orderInfo, ...timeInfo };
    const createdNewOrder = await Order.create(info);
    return createdNewOrder;
  }

  async update({ order_Id, update }) {
    const filter = { _id: order_Id };
    const option = { returnOriginal: false };
    const time = timeZone();
    const updateInfo = { ...update, updatedTime: time };
    const updatedOrder = await Order.findOneAndUpdate(
      filter,
      updateInfo,
      option,
    );
    console.log(updatedOrder);
    return updatedOrder;
  }

  async deleteOne(order) {
    const deleteorder = await Order.deleteOne({ orderId: order.orderId });
    return deleteorder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
