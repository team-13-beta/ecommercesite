import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import { adminRouter } from "./admin-router.js";

// import {adminRouter} from "./admin-router"
const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함ㅅ
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("user/home/home"));
viewsRouter.use("/register", serveStatic("auth/register/register"));
viewsRouter.use(
  "/registerOauth",
  serveStatic("auth/registerOauth/registerOauth"),
);
viewsRouter.use("/login", serveStatic("auth/login/login"));
viewsRouter.use("/mypage", serveStatic("user/mypage/mypage"));
viewsRouter.use("/admin", serveStatic("admin/admin"));
viewsRouter.use(
  "/user/accountUpdate",
  serveStatic("user/accountUpdate/accountUpdate"),
);
viewsRouter.use(
  "/user/oauthUpdate",
  serveStatic("user/oauthUpdate/oauthUpdate"),
);

viewsRouter.use("/user/bucket", serveStatic("user/bucket/bucket"));
viewsRouter.use("/user/order", serveStatic("user/order/order"));
viewsRouter.use("/user/oauth", serveStatic("user/oauth/oauth"));
viewsRouter.use("/user/order/success", serveStatic("/user/order/orderSuccess"));
viewsRouter.use("/user/products/:id", serveStatic("user/products/products"));
viewsRouter.use("/user/userorder", serveStatic("user/userorder/userorder"));

// user/accountUpdate/accountUpdate.html
// user/bucket/bucket.html
// user/order/order.html
// user/products/products.html
// user/userorder/userorder.html

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  // const __dirname = path.resolve();
  const splitedResource = resource.split("/");
  const fileName = splitedResource[splitedResource.length - 1];
  const filePath = splitedResource
    .slice(0, splitedResource.length - 1)
    .join("/");

  /*
경로 정상 출력 확인 코드
console.log("splitedResource : "+splitedResource);
console.log("fileName : "+fileName);
console.log("filePath : "+filePath);
*/

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const resourcePath = path.join(__dirname, `../views/${filePath}`);

  const option = { index: `${fileName}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
