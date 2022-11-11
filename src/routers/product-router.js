import { Router } from "express";
import is from "@sindresorhus/is";
import { categoryService } from "../services/index.js";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from "../middlewares";
//import { userService } from "../services";
import { productService } from "../services/index.js";

//상품 관련 라우터
const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    if (!products[0]) throw new Error("상품이 존재하지 않습니다.");

    let result = [];
    for (let product of products) {
      let content = {
        id: String(product.productId),
        name: product.name,
        categoryId: product.categoryId, //(product.categoryId.categoryId)
        price: product.price,
        stock: product.stock,
        company: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updatedTime: product.updatedTime,
      };
      result.push(content);
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    // 추가해볼 데이터
    const {
      name,
      stock,
      price,
      company,
      categoryId,
      summary,
      nutritionImage,
      deliveryImage,
      detailImage,
      titleImage,
    } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      stock,
      price,
      company,
      categoryId,
      summary,
      nutritionImage,
      deliveryImage,
      detailImage,
      titleImage,
    });
    const result = {
      code: 200,
      data: {
        id: String(newProduct.productId),
        name: newProduct.name,
        categoryId: newProduct.categoryId,
        price: newProduct.price,
        stock: newProduct.stock,
        company: newProduct.company,
        description: newProduct.description,
        createdTime: newProduct.createdTime,
        updateTime: newProduct.updateTime,
      },
    };
    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    if (newProduct === null) {
      res.status(501).json({
        code: 501,
        message:
          "카테고리 정보가 존재하지 않거나 기존 상품이 등록되어 있어서 상품을 생성할 수 없습니다.",
      });
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// 카테고리 종속 상품 조회
productRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) throw new Error("요청하신 카테고리는 존재하지 않습니다.");
    const products = await productService.getProductByCategory(categoryId);
    let result = [];
    for (let product of products) {
      let content = {
        id: String(product.productId),
        name: product.name,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        company: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updateTime: product.updateTime,
      };
      result.push(content);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//상품 상세 조회
productRouter.get("/item/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProduct(productId);
    if (!product)
      throw new Error("상품이 이미 삭제되었거나 존재하지 않습니다.");

    const result = {
      code: 200,
      data: {
        id: String(product.productId),
        name: product.name,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        company: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updateTime: product.updateTime,
      },
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  // 삭제할 상품 이름
  try {
    const productId = req.params.productId;
    const deleteProduct = await productService.deleteProduct(productId);

    const result = {
      code: 200,
      data: {
        id: String(deleteProduct.productId),
        name: deleteProduct.name,
      },
    };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

productRouter.patch("/:productId", async function (req, res, next) {
  try {
    // params로부터 id를 가져옴
    const productId = req.params.productId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const {
      name,
      stock,
      price,
      company,
      summary,
      nutritionImage,
      deliveryImage,
      detailImage,
      titleImage,
      categoryId,
    } = req.body;
    const description = {
      summary,
      nutritionImage,
      deliveryImage,
      detailImage,
      titleImage,
    };
    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(stock && { stock }),
      ...(price && { price }),
      ...(description && { description }),
      ...(company && { company }),
      ...(categoryId && { categoryId }),
    };
    // 사용자 정보를 업데이트함.
    const updatedProductInfo = await productService.setProduct(
      productId,
      toUpdate,
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedProductInfo);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
