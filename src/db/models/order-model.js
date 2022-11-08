import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema.js";
import {timeZone} from '../../services/timeZone.js';

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
        const findorder = await Order.find( { orderId: Id } );
        console.log(findorder);
        return findorder;
    }

    async findAll() {
        const orders = await Order.find({});
        return orders;
    }
    async create(orderInfo) {
        const num2=await Order.find().sort({"orderId":-1}).limit(1);
        console.log(num2);
        let orderId=1;
        if(num2===[]){
            orderId=1;
        }else{
            orderId=Number(num2[0].orderId)+1;
        }
        //const orderId = (num2 === [])? 1 : Number(num2[0].orderId)+1;
        console.log(orderId);
        //console.log(num2);
        const time = timeZone();
        const timeInfo = {createdTime:time,updatedTime:time};
        const info = { orderId, ...orderInfo , ...timeInfo};
        const createdNewOrder = await Order.create(info);
        return createdNewOrder;
    }

    async update({ orderId, update }) {
        const filter = { _id: orderId };
        const option = { returnOriginal: false };
        const time = timeZone();
        const updateInfo = {...update, updatedTime:time}
       
        const updatedOrder = await Order.findOneAndUpdate(filter, updateInfo, option);
        console.log(updatedOrder);
        return updatedOrder;
      }

    async deleteOne(order){
        const deleteorder=await Order.deleteOne({name: order.name});
        return deleteorder;
    }
}

const orderModel = new OrderModel();

export { orderModel };
