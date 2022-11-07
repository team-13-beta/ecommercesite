import { productModel, basketModel } from '../db/index.js';


class BasketService {
    constructor(basketModel) {
        this.basketModel = basketModel;
    }
    
    // 해당 장바구니를 출력하는 함수
    async getBasket(basketId) {
        const basket = await this.basketModel.findById(basketId);
        return basket;
    }

    async addBasket(){
        // 객체 destructuring
        //const { name,quantity } = basketInfo;

        // 카테고리 이름 중복 확인

        // db에 저장
        const createdNewBasket = await this.basketModel.create();

        return createdNewBasket;
    }

    async setBasket(productId,basketId) {
   
        // 우선 해당 id의 상품이 db에 있는지 확인
        let product=await productModel.findById(productId);
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!product) {
          throw new Error('상품이 없습니다. 다시 한 번 확인해 주세요.');
        }
        let basket=await this.basketModel.findById(basketId);
        if (!basket) {
            throw new Error('장바구니가 없습니다. 다시 한 번 확인해 주세요.');
          }
        // 이제 드디어 업데이트 시작
        let basketAndproduct=await this.basketModel.findProduct(basketId,productId);
        // 해당 장바구니에 이미 상품이 들어있다면
        if(basketAndproduct){
            //const productIndex=await this.basketModel.findIndex(basketId, productId);
            // 상품이 들어있는 index 번호를 찾고
            const productIndex=basketAndproduct.productList.indexOf(productId);
            //const productCount=basketAndproduct.quantity[productIndex]+1;
            // 상품량 배열에서 해당 부분을 +1 합니다.
            const productCountArr=basketAndproduct.quantity;
            productCountArr[productIndex]+=1;
            //console.log(productCount+1);
            // 수정한 상품량 배열로 update합니다.
            basket = await this.basketModel.updateQuantity({
                basketId,
                productCountArr,
            });

            return basket;
            throw new Error('존재하는 상품입니다.');
        }else{
            basket = await this.basketModel.update({
                productId,
                basketId,
            });
        
            return basket;
        }
        // 업데이트 진행
        
      }
      async setsubBasket(productId,basketId) {
   
        // 우선 해당 id의 상품이 db에 있는지 확인
        let product=await productModel.findById(productId);
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!product) {
          throw new Error('상품이 없습니다. 다시 한 번 확인해 주세요.');
        }
        let basket=await this.basketModel.findById(basketId);
        if (!basket) {
            throw new Error('장바구니가 없습니다. 다시 한 번 확인해 주세요.');
          }
        // 이제 드디어 업데이트 시작
        let basketAndproduct=await this.basketModel.findProduct(basketId,productId);
        
        // 해당 장바구니에 이미 상품이 들어있다면
        if(basketAndproduct){
            // 상품이 들어있는 index 번호를 찾고
            const productIndex=basketAndproduct.productList.indexOf(productId);
            console.log(productIndex);
            //const productCount=basketAndproduct.quantity[productIndex]+1;
            // 상품량 배열에서 해당 부분을 -1 합니다.
            let productCountArr=basketAndproduct.quantity;
            let productArr=basketAndproduct.productList;
            productCountArr[productIndex]-=1;
            // -1한 값이 0이 된다면
            if(productCountArr[productIndex]===0){
                console.log(productIndex);
                // 해당 index의 내용을 삭제한 배열들을 매개로 전달
                productArr.splice(productIndex,1);
                productCountArr.splice(productIndex,1);
                basket=await this.basketModel.updatesubQuantity({ 
                    basketId,
                    productArr,
                    productCountArr
                });
                return basket;
                //throw new Error('이미 없는 상품입니다.');
            }else if(productCountArr[productIndex] > 0){
                // 수정한 상품량 배열로 update합니다.
                basket = await this.basketModel.updateQuantity({
                    basketId,
                    productCountArr,
                });
                return basket;
            }

            throw new Error('존재하는 상품입니다.');
        }else{
            throw new Error('존재하지 않는 상품입니다.');
        }
        // 업데이트 진행
        
      }
}

const basketService = new BasketService(basketModel);

export { basketService };