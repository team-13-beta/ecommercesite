import { Router } from "express";
import { loginRequired } from "../middlewares/login-required.js";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from "../middlewares";
//import { userService } from "../services";
import { orderService } from "../services/index.js";

import oauth2 from "passport-google-oauth2";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

//상품 관련 라우터
const orderRouter = Router();
orderRouter.use(cookieParser());
// orderRouter.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: false, // js 코드로 쿠키를 가져오지 못하게
//       secure: false, // https 에서만 가져오도록 할 것인가?
//       // maxAge:1800000 // cookie expired : 30minute
//     },
//     store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}),
//     //store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}),
//   })
// );

orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    let result = [];
    for (let order of orders) {
      let content = {
        id: String(order.orderId),
        userName: order.userName,
        userId: order.userId, //(product.categoryId.categoryId)
        buyingProduct: order.buyingProduct,
        address: order.address,
        phoneNumber: order.phoneNumber,
        status: order.status,
        totalPrice: order.totalPrice,
        createdTime: order.createdTime,
        updatedTime: order.updatedTime,
      };
      result.push(content);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

orderRouter.get("/:consumer_id", async (req, res, next) => {
  try {
    const consumer_id = req.params.consumer_id;
    const orders = await orderService.getOrders(consumer_id);
    let result = [];
    for (let order of orders) {
      let content = {
        id: String(order.orderId),
        userName: order.userName,
        userId: order.userId, //(product.categoryId.categoryId)
        buyingProduct: order.buyingProduct,
        address: order.address,
        phoneNumber: order.phoneNumber,
        status: order.status,
        totalPrice: order.totalPrice,
        createdTime: order.createdTime,
        updatedTime: order.updatedTime,
      };
      result.push(content);
    }
    //console.log(products);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

//주문 상세조회 API
orderRouter.get("/item/:order_id", async (req, res, next) => {
  try {
    const order_id = req.params.order_id;
    const order = await orderService.getOrder(Number(order_id));
    //console.log(products);
    let result = {
      id: String(order.orderId),
      userName: order.userName,
      userId: order.userId, //(product.categoryId.categoryId)
      buyingProduct: order.buyingProduct,
      address: order.address,
      phoneNumber: order.phoneNumber,
      status: order.status,
      totalPrice: order.totalPrice,
      createdTime: order.createdTime,
      updatedTime: order.updatedTime,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// order 생성 loginRequired로 누군지 사전 파악 후 처리
orderRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    // 추가해볼 데이터
    const userObjId = req.currentUserId;
    if (req.body.userName) {
      // token 방식일 경우
      const { userName, address, phoneNumber, buyingProduct } = req.body;
      const basket = { userName, address, phoneNumber, buyingProduct };
      //console.log(basket);
      //console.log(userId,basket);
      // 위 데이터를 유저 db에 추가하기
      const newOrder = await orderService.addOrder({
        userObjId,
        basket,
      });
    } else {
      console.log("주문넣었을때!!");
      console.log(req.cookies);
      res.json({ gg: "fwfwfwxxxx" });
    }
    const result = {
      code: 200,
      message: "주문 성공!",
    };
    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.patch("/:order_Id", async function (req, res, next) {
  try {
    // params로부터 id를 가져옴
    const order_Id = req.params.order_Id;
    console.log(order_Id);
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { address, status } = req.body;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(address && { address }),
      ...(status && { status }),
    };
    console.log(toUpdate);
    // 사용자 정보를 업데이트함.
    const updatedOrderInfo = await orderService.setOrder(order_Id, toUpdate);

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedOrderInfo);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/:order_Id", loginRequired, async (req, res, next) => {
  // 삭제할 상품 이름
  try {
    const order_Id = req.params.order_Id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const userObjId = req.currentUserId;
    console.log(userObjId);
    const deleteorder = await orderService.deleteOrder(order_Id, userObjId);
    res.status(201).json(deleteorder);
  } catch (err) {
    next(err);
  }
});
export { orderRouter };
