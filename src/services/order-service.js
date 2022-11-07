import { orderModel,userModel } from '../db/index.js';


class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    
    // 전체 상품 데이터를 조회하는 함수
    async getAllOrders() {
        const orders = await this.orderModel.findAll();
        return orders;
    }


    async getOrders(consumer_id) {
        const user = await userModel.findById(consumer_id);

        const orders = await this.orderModel.findByUsers(user._id);
        return orders;
    }

    async addOrder(orderInfo){
        // 객체 destructuring
        const { user_Id,basket } = orderInfo;
        console.log(user_Id,basket);
        
        const user=await userModel.findById(user_Id);
        //console.log(user);
        if(!user){
            throw new Error("사용자를 찾을 수 없습니다.");
        }
        const address=user.address.address1;
        //console.log(address);
        const status="주문 결제 전";
        //console.log(status);
        let totalPrice=0;

        for(let b of basket){
            totalPrice+=Number(b.price)*Number(b.stock);
        }
        console.log(totalPrice);

        // db에 저장
        const createdNewOrder = await this.orderModel.create({
            userId:user._id,
            buying_product:basket,
            // address,
            status,
            totalPrice,
        });

        return createdNewOrder;
    }

    async setOrder(consumerId, orderId, toUpdate) {
   
        // 우선 해당 id의 유저가 db에 있는지 확인
        let order = await this.orderModel.findByUser(consumerId,orderId)
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!order) {
          throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }
    
        order = await this.orderModel.update({
          orderId,
          update: toUpdate,
        });
    
        return order;
      }

    async deleteOrder(consumerId,orderId){
        let order = await this.orderModel.findByUser(consumerId,orderId)

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!order) {
            throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
          }

        const deleteOrder=await this.orderModel.deleteOne(order);
        return deleteOrder;
    }

}

const orderService = new OrderService(orderModel);

export { orderService };