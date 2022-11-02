import { Router } from "express";
import is from "@sindresorhus/is";
import { categoryService } from "../services/index.js";

//카테고리 관련 라우터
const categoryRouter = Router();

categoryRouter.get("/", async (req,res,next)=>{
    try{
        const categories=await categoryService.getProducts();
        console.log(categories);
        res.status(200).json(categories);
    }catch(err){
        next(err);
    }
})
categoryRouter.post("/",async(req,res,next)=>{
    try {
        // req (request)의 body 에서 데이터 가져오기
        // 추가해볼 데이터
        const { name }=req.body;
    
        // 위 데이터를 유저 db에 추가하기
        const newCategory = await categoryService.addCategory({
          name,
        });
    
        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newCategory);
      } catch (error) {
        next(error);
      }
})

export { categoryRouter };
