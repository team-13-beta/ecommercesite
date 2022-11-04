import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema.js";


const Order = model("orders", OrderSchema);

export class OrderModel {
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
      }
    async findByUser(consumerId,orderId) {
        const orderByUser = await Order.find({ userId: consumerId }).findOne({_id:orderId});
        return orderByUser;
    }
    async findAll() {
        const orders = await Order.find({});
        return orders;
    }
    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async update({ orderId, update }) {
        const filter = { _id: orderId };
        const option = { returnOriginal: false };
    
        const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
        console.log(updatedOrder);
        return updatedOrder;
      }
}

const orderModel = new OrderModel();

export { orderModel };
