import { categoryModel } from '../db/index.js';


class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    
    // 전체 상품 데이터를 조회하는 함수
    async getProducts() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    async addCategory(categoryInfo){
        // 객체 destructuring
        const { name } = categoryInfo;

        // 카테고리 이름 중복 확인
        const category = await this.categoryModel.findByName(name);
        if (category) {
            throw new Error(
                '이 상품은 현재 등록중입니다. 다른 상품을 등록해 주세요.',
            );
        }


        // db에 저장
        const createdNewCategory = await this.categoryModel.create({
            name,
        });

        return createdNewCategory;
    }
    
    async setCategory(categoryId,toUpdate,) {
   
        // 우선 해당 id의 유저가 db에 있는지 확인
        let category = await this.categoryModel.findById(categoryId);
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!category) {
          throw new Error('카테고리가 없습니다. 다시 한 번 확인해 주세요.');
        }
    
        // 이제 드디어 업데이트 시작
 
        // 업데이트 진행
        category = await this.categoryModel.update({
          categoryId,
          update: toUpdate,
        });
    
        return category;
      }

    async deleteCategory(categoryId){
        // 만약
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new Error(
                '삭제 불가능합니다.',
            );
        }

        const deleteCategory=await this.categoryModel.deleteOne(category);

        return deleteCategory;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };