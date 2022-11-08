import { productModel } from "./product-model.js";
import { timeZone } from "../../services/timeZone.js";

const time = timeZone();
async function productModelTest() {
  if (!(await productModel.findByName("닭가슴살")))
    productModel.create({
      productId: 1,
      name: "닭가슴살",
      stock: 200,
      price: 2000,
      description: "닭가슴살 초기 테스트 데이터",
      company: "허닭",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });

  if (!(await productModel.findByName("돼지고기")))
    productModel.create({
      productId: 2,
      name: "돼지고기",
      stock: 270,
      price: 8000,
      description: "돼지고기 초기 테스트 데이터",
      company: "forking",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });

  if (!(await productModel.findByName("소고기")))
    productModel.create({
      productId: 3,
      name: "소고기",
      stock: 200,
      price: 2000,
      description: "스테이크 초기 테스트 데이터",
      company: "blackCow",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await productModel.findByName("샐러드")))
    productModel.create({
      productId: 4,
      name: "샐러드",
      stock: 200,
      price: 2000,
      description: "샐러드 초기 테스트 데이터",
      company: "허닭",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await productModel.findByName("밀킷")))
    productModel.create({
      productId: 5,
      name: "밀킷",
      stock: 200,
      price: 2000,
      description: "밀킷 초기 테스트 데이터",
      company: "밀킷회사",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });
  if (!(await productModel.findByName("단백질음료")))
    productModel.create({
      productId: 6,
      name: "단백질음료",
      stock: 200,
      price: 2000,
      description: "단백질음료 초기 테스트 데이터",
      company: "이온음료회사",
      categoryId: "6367effeb7f16a06dd406f4d",
      createdTime: time,
      updatedTime: time,
    });
}

export { productModelTest };
