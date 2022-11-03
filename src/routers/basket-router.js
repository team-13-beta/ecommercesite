import { Router } from "express";
import is from "@sindresorhus/is";
import { basketService } from "../services/index.js";

//장바구니 관련 라우터
const basketRouter = Router();

basketRouter.get("/:basketId", async (req,res,next)=>{
    try{
        const basketId=req.params.basketId;
        const basket=await basketService.getBasket(basketId);
        console.log(basket);
        res.status(200).json(basket);
    }catch(err){
        next(err);
    }
})
basketRouter.post("/",async(req,res,next)=>{
    try {
        // req (request)의 body 에서 데이터 가져오기
        // 추가해볼 데이터
        const { name,quantity }=req.body;
    
        // 위 데이터를 유저 db에 추가하기
        const newBasket = await basketService.addBasket();
    
        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newBasket);
      } catch (error) {
        next(error);
      }
})

basketRouter.patch("/:productId",async(req,res,next)=>{
    try{
        const productId=req.params.productId;
        const {basketId}=req.body;
        const updatedbasketInfo = await basketService.setBasket(productId,basketId);

        res.status(200).json(updatedbasketInfo);
    }catch(err){
        next(err);
    }
})

basketRouter.patch("/sub/:productId",async(req,res,next)=>{
    try{
        const productId=req.params.productId;
        const {basketId}=req.body;
        const updatedbasketInfo = await basketService.setsubBasket(productId,basketId);

        res.status(200).json(updatedbasketInfo);
    }catch(err){
        next(err);
    }
})

export { basketRouter };
