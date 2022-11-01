import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from "../middlewares";
//import { userService } from "../services";
import { productService } from "../services/index.js";

//상품 관련 라우터
const productRouter = Router();


productRouter.get("/", async (req,res,next)=>{
    try{
        const products=await productService.getProducts();
        console.log(products);
        res.status(200).json(products);
    }catch(err){
        next(err);
    }
})

productRouter.get("/add",async(req,res,next)=>{
    try {
        // req (request)의 body 에서 데이터 가져오기
        // 추가해볼 데이터
        const name = "닭가슴살 주먹밥";
        const stock = 30;
        const price = 3500;
        const description = {imageUrl:["rkskekasdf","aakfkqkdfasdf"]};
        const company = "베타밥";

    
        // 위 데이터를 유저 db에 추가하기
        const newProduct = await productService.addProduct({
          name,
          stock,
          price,
          description,
          company,
        });
    
        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newProduct);
      } catch (error) {
        next(error);
      }
})

productRouter.get("/delete",async (req,res,next)=>{
    // 삭제할 상품 이름
    try{
        const name="닭가슴살 소시지";
        const deleteproduct=await productService.deleteProduct(name);
    
        res.status(201).json(deleteproduct);
    }catch(err){
        next(err);
    }
});
export { productRouter };
