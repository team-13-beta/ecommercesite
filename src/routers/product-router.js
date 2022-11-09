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
    let result=[];
    for(let product of products){
      let content={
        id: String(product.productId),
        name: product.name,
        categoryId: String(product.categoryId.categoryId),
        price: product.price,
        stock: product.stock,
        companyName: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updateTime: product.updateTime
      }
      result.push(content);
    }
    console.log(products);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// productRouter.get("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const products = await productService.getProduct(id);
//     console.log(products);
//     res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// });

productRouter.post("/", async (req, res, next) => {
  try {
    // req (request)의 body 에서 데이터 가져오기
    // 추가해볼 데이터
    const { name,stock,price, company, categoryId, nutritionImage, deleveryImage, detailImage, titleImage } = req.body;
    const description = {
      nutritionImage,
      deleveryImage,
      detailImage,
      titleImage
    }
    // 위 데이터를 유저 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      stock,
      price,
      company,
      categoryId,
      description
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 카테고리 종속 상품 조회
productRouter.get('/:categoryId', async(req,res,next)=>{
  try{
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategoryById(categoryId);
    if(!category) throw new Error('요청하신 카테고리는 존재하지 않습니다.')
    let categoryObjId = category._id.toString();
    const products = await productService.getProductByCategory(categoryObjId);
    let result=[];
    for(let product of products){
      let content={
        id: String(product.productId),
        name: product.name,
        categoryId: String(product.categoryId.categoryId),
        price: product.price,
        stock: product.stock,
        companyName: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updateTime: product.updateTime
      }
      result.push(content);
    }
    res.status(200).json(result);
  }catch(error){
    next(error)
  }
})

//상품 상세 조회
productRouter.get('/item/:productId', async (req,res,next)=>{
    try {
    const productId = req.params.productId;
    const product = await productService.getProduct(productId);
    console.log(product);
    const result={
      code:200,
      data :{
        id: String(product.productId),
        name: product.name,
        categoryId: String(product.categoryId.categoryId),
        price: product.price,
        stock: product.stock,
        companyName: product.company,
        description: product.description,
        createdTime: product.createdTime,
        updateTime: product.updateTime
      }
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  // 삭제할 상품 이름
  try {
    const { productId } = req.params.productId;
    const deleteproduct = await productService.deleteProduct(productId);

    res.status(201).json(deleteproduct);
  } catch (err) {
    next(err);
  }
});

productRouter.patch("/:productId", async function (req, res, next) {
  try {
    // params로부터 id를 가져옴
    const productId = req.params.productId;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { name, stock, price, company, nutritionImage, deleveryImage, detailImage, titleImage } = req.body;
    const description = {
      nutritionImage,
      deleveryImage,
      detailImage,
      titleImage
    }
    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(name && { name }),
      ...(stock && { stock }),
      ...(price && { price }),
      ...(description && { description }),
      ...(company && { company }),
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
