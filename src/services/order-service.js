import { orderModel, userModel, productModel } from "../db/index.js";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 전체 상품 데이터를 조회하는 함수
  async getAllOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 유저의 주문 내역을 조회하는 함수
  async getOrders(consumer_id) {
    const user = await userModel.findById(consumer_id);

    if (!user)
      throw new Error(
        "사용자의 주문내역을 요청하셨지만 해당하는 사용자가 존재하지 않거나 토큰이 유효하지 않습니다",
      );
    const orders = await this.orderModel.findByUsers(user._id.toString());
    return orders;
  }

  // 해당 주문 내역을 상세 조회하는 함수
  async getOrder(order_id) {
    const order = await this.orderModel.findByOrderId(order_id);
    return order;
  }

  // 주문을 하는데 재고가 0인 경우를 고려한 코드 작성 필요!!!!

  async addOrder(orderInfo) {
    // 객체 destructuring
    const { userObjId, basket } = orderInfo;
    console.log(userObjId);
    const user = await userModel.findById(userObjId);

    if (!user)
      throw new Error(
        "주문을 요청하셨지만 해당하는 사용자가 없거나 토큰이 유효하지 않습니다.",
      );
    let userId = user._id;
    userId = userId.toString();

    console.log(user);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    const address = user.address.address1;
    console.log(address);
    const status = "배송 전";
    //console.log(status);
    let totalPrice = 0;

    // 상품 총액 계산
    for (let b of basket.buyingProduct) {
      totalPrice += b.price * b.stock;
    }
    console.log(user);
    // db에 저장
    const createdNewOrder = await this.orderModel.create({
      userId,
      userName: basket.userName,
      buyingProduct: basket.buyingProduct,
      address: basket.address,
      phoneNumber: basket.phoneNumber,
      // address,
      status,
      totalPrice,
    });

    for (let item of basket.buyingProduct) {
      let product = await productModel.findByName(item.name);
      console.log(product);
      const stock = product.stock - item.stock;
      const productId = product.productId;
      const toUpdate = { stock: stock };
      product = await productModel.update({
        productId,
        update: toUpdate,
      });
      console.log(`${product.name}의 현 재고 : ${product.stock}입니다.`);
    }
    return createdNewOrder;
  }

  async setOrder(orderId, toUpdate) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    let order = await this.orderModel.findByOrderId(Number(orderId));

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!order) {
      throw new Error("주문 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }
    let order_Id = order._id;
    //console.log(orderid);
    order = await this.orderModel.update({
      order_Id,
      update: toUpdate,
    });

    return order;
  }

  async deleteOrder(orderId, userObjId) {
    let user = await userModel.findById(userObjId);
    if (user.role === "user") {
      let order = await this.orderModel.findByOrderId(Number(orderId));
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!order) {
        throw new Error("주문 내역이 없습니다. 다시 한 번 확인해 주세요.");
      }
      console.log(order);
      let order_Id = order._id;
      let status = "주문 취소";
      const toUpdate = {
        ...(status && { status }),
      };
      console.log(orderId, toUpdate);
      //throw new Error("흠");
      order = await this.orderModel.update({
        order_Id,
        update: toUpdate,
      });

      return order;
    } else if (user.role === "admin") {
      let order_Id = Number(orderId);
      let order = await this.orderModel.findByOrderId(order_Id);

      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!order) {
        throw new Error("주문 내역이 없습니다. 다시 한 번 확인해 주세요.");
      }

      const deleteOrder = await this.orderModel.deleteOne(order);
      console.log(deleteOrder);
      for (let item of order.buyingProduct) {
        let product = await productModel.findByName(item.name);
        console.log(product);
        const stock = product.stock + item.stock;
        const productId = product.productId;
        const toUpdate = { stock: stock };
        product = await productModel.update({
          productId,
          update: toUpdate,
        });
        console.log(`${product.name}의 현 재고 : ${product.stock}입니다.`);
      }
      return deleteOrder;
    }
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
