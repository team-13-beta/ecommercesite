import cors from "cors";
import express from "express";
import {
  viewsRouter,
  userRouter,
  productRouter,
  categoryRouter,
  basketRouter,
  orderRouter,
} from "./routers/index.js";
import { errorHandler } from "./middlewares/index.js";
import {
  productModelTest,
  userModelTest,
  categoryModelTest,
} from "./db/testmodel.js";
const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use("/api", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/basket", basketRouter);
app.use("/orders", orderRouter);
// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨

async function test() {
  await categoryModelTest();
  await userModelTest();
  await productModelTest();
  console.log(`테스트 코드 생성 완료`);
}
// test();

app.use((req, res, next) => {
  res.status(404).send("요청하시는 페이지가 존재하지 않습니다. Error:404");
});

app.use(errorHandler);

export { app };
