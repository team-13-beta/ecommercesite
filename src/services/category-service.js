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
    
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };