import { productModel,categoryModel } from '../db/index.js';


class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    
    // 전체 상품 데이터를 조회하는 함수
    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }
    
    async getProduct(id){
        const product = await this.productModel.findById(id);
        return product;
    }

    async getProductByCategory(categoryObjId){
        const product = await this.productModel.findByCategory(categoryObjId);
        return product;
    }
    async addProduct(productInfo){
        // 객체 destructuring
        const { name,stock, price, description,company,categoryName } = productInfo;

        const category=await categoryModel.findByName(categoryName);
        // 상품 이름 중복 확인
        const product = await this.productModel.findByName(name);
        if (product) {
            throw new Error(
                '이 상품은 현재 등록되었습니다. 다른 상품을 등록해 주세요.',
            );
        }
        // db에 저장
        const createdNewProduct = await this.productModel.create({
            name,
            stock,
            price,
            description,
            company,
            categoryId:category._id
        });

        return createdNewProduct;
    }

    // 상품 이름을 매개변수로 받아서 삭제 기능 구현
    async deleteProduct(productId){
        // 만약
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new Error(
                '삭제 불가능합니다.',
            );
        }

        const deleteProduct=await this.productModel.deleteOne(product);

        return deleteProduct;
    }

    async setProduct(productId, toUpdate) {
   
        // 우선 해당 id의 유저가 db에 있는지 확인
        let product = await this.productModel.findById(productId);
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!product) {
          throw new Error('상품 내역이 없습니다. 다시 한 번 확인해 주세요.');
        }
    
        // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함
        // 이제 드디어 업데이트 시작
 
        // 업데이트 진행
        // 흠... update:toUpdate이거 함 알아봐야할듯,
        // 아니면 걍 update할떄 parameter로 product 가져와서 전체 update?
        product = await this.productModel.update({
          productId,
          update: toUpdate,
        });
    
        return product;
      }
}

const productService = new ProductService(productModel);

export { productService };