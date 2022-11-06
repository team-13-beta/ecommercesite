import {productModel} from './product-model.js';

async function productModelTest(){
    if(!await productModel.findByName("닭가슴살"))
    productModel.create({
        name:"닭가슴살",
        stock:200,
        price:2000,
        description:"닭가슴살 초기 테스트 데이터",
        company:"허닭",
        categoryId:"6362576490d1a27fbf0238fe"
    });

    if(!await productModel.findByName("돼지고기"))
    productModel.create({
        name:"돼지고기",
        stock:270,
        price:8000,
        description:"돼지고기 초기 테스트 데이터",
        company:"forking",
        categoryId:"636257ba18d12f3ff9684e77"
    });

    if(!await productModel.findByName("소고기"))
    productModel.create({
        name:"소고기",
        stock:20,
        price:2000,
        description:"스테이크 초기 테스트 데이터",
        company:"blackCow",
        categoryId:"636257ba18d12f3ff9684e7d"
    });
    if(!await productModel.findByName("샐러드"))
    productModel.create({
        name:"샐러드",
        stock:200,
        price:2000,
        description:"샐러드 초기 테스트 데이터",
        company:"허닭",
        categoryId:"636257ba18d12f3ff9684e80"
    });
    if(!await productModel.findByName("밀킷"))
    productModel.create({
        name:"밀킷",
        stock:200,
        price:2000,
        description:"밀킷 초기 테스트 데이터",
        company:"밀킷회사",
        categoryId:"636257ba18d12f3ff9684e83"
    });
    if(!await productModel.findByName("단백질음료"))
    productModel.create({
        name:"단백질음료",
        stock:200,
        price:2000,
        description:"단백질음료 초기 테스트 데이터",
        company:"이온음료회사",
        categoryId:"63626533abebe123aafbf696"
    });
}

export {productModelTest}