import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
//const DB_URL = process.env.MONGO_ATALS_URL;
const DB_URL = process.env.MONGO_ATALS_URL;
// "mongodb+srv://betaUser:lg0n7wsxWi4VU9Dq@cluster0.hl0qqs1.mongodb.net/?retryWrites=true";
// process.env.MONGODB_URL ||
// "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  dbName: "product_test",
});
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL),
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
);

// user-model.js 에서 export { ~~ } 한 모듈을 그대로 다시 export해 줌
// 이렇게 하면, 나중에 import 할 때 코드가 짧아짐
// 예시로, import userModel from '../db/models/user-model' 대신 from '../db' 가 됨
// '../db/index.js' 에서 index.js 는 생략 가능하므로, '../db' 면 됨 (index는 특별한 용어)
export * from "./models/user-model.js";
export * from "./models/product-model.js";
export * from "./models/category-model.js";
export * from "./models/basket-model.js";
export * from "./models/order-model.js";
