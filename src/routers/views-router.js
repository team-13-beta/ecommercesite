import express from "express";
import path from "path";
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import {adminRouter} from "./admin-router.js";
// import {adminRouter} from "./admin-router"
const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함ㅅ
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("user/home"));
viewsRouter.use("/register", serveStatic("auth/register"));
viewsRouter.use("/login", serveStatic("auth/login"));
viewsRouter.use("/admin",serveStatic("admin/admin"),adminRouter); // 아래 split 연산때문에 admin/admin으로 인자 pass

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  // const __dirname = path.resolve();
  
  const fileName =  resource.split("/")[1];
  const __dirname = dirname(fileURLToPath(import.meta.url));
  
  // admin만 예외처리 
  if(resource === "admin/admin")
  resource = "admin";

  const resourcePath = path.join(__dirname, `../views/${resource}`);

console.log("fineName is "+fileName);
  const option = { index: `${fileName}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
