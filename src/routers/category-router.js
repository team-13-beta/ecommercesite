import { Router } from "express";
import is from "@sindresorhus/is";
import { categoryService } from "../services/index.js";

//카테고리 관련 라우터
const categoryRouter = Router();

categoryRouter.get("/", async (req,res,next)=>{
    try{
        const categories=await categoryService.getCategories();
        //console.log(categories);
        let result = [];
        for (let item of categories){
          let content = {
            id:String(item.categoryId),
            name:item.name
          }
          result.push(content);
        }
        res.status(200).json(result);
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
      const result = {
        code : 201,
        data : {
          id:String(newCategory.categoryId),
          name:newCategory.name,
          created_date:newCategory.createdTime,
          updated_date:newCategory.updatedTime
        }
      };
        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
})

categoryRouter.patch(
  "/:categoryId",
  async function (req, res, next) {
    try {
      // params로부터 id를 가져옴
      const categoryId = req.params.categoryId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const {name}=req.body;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(categoryId && {categoryId}),
        ...(name && { name }),
      };
      //console.log(toUpdate);
      // 사용자 정보를 업데이트함.
      const updatedCategoryInfo = await categoryService.setCategory(
        categoryId,
        toUpdate,
      );
      const result = {
        code : 200,
        data : {
          id:String(updatedCategoryInfo.categoryId),
          name:updatedCategoryInfo.name,
        }
      };  

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

categoryRouter.delete("/:categoryId",async (req,res,next)=>{
  // 삭제할 상품 이름
  try{
      const categoryId=req.params.categoryId;
      const deleteCategory=await categoryService.deleteCategory(categoryId);
  
      const result = {
        code:200,
        data:{
          id:String(deleteCategory.categoryId),
          name:deleteCategory.name
        }
      }

      res.status(200).json(result);
  }catch(err){
      next(err);
  }
});

export { categoryRouter };
