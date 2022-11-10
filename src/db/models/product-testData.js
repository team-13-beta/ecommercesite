import {productModel} from './product-model.js';
import {productService} from "../../services/product-service.js"
import {timeZone} from '../../services/timeZone.js';

const time = timeZone();
async function productModelTest(){
    if(!await productModel.findByName("닭가슴살"))
        await productService.addProduct({
            name:"닭가슴살",
            stock:200,
            price:2000,
            description:"닭가슴살 초기 테스트 데이터",
            company:"허닭",
            categoryId:1,
        })

        if(!await productModel.findByName("돼지고기"))
        await productService.addProduct({
            name:"돼지고기",
            stock:270,
            price:8000,
            description:"돼지고기 초기 테스트 데이터",
            company:"forking",
            categoryId:3,

        });
      
        if(!await productModel.findByName("소고기"))
        await productService.addProduct({
            name:"소고기",
            stock:200,
            price:2000,
            description:"스테이크 초기 테스트 데이터",
            company:"blackCow",
            categoryId:5
        });

        if(!await productModel.findByName("샐러드"))
        await productService.addProduct({
            name:"샐러드",
            stock:200,
            price:2000,
            description:"샐러드 초기 테스트 데이터",
            company:"허닭",
            categoryId:6
        });
       
        if(!await productModel.findByName("밀킷"))
        await productService.addProduct({
            name:"밀킷",
            stock:200,
            price:2000,
            description:"밀킷 초기 테스트 데이터",
            company:"밀킷회사",
            categoryId:7
        })
       
        if(!await productModel.findByName("단백질음료"))
        await productService.addProduct({
            name:"단백질음료",
            stock:200,
            price:2000,
            description:"단백질음료 초기 테스트 데이터",
            company:"이온음료회사",
            categoryId:4
        })   
}

export {productModelTest}
