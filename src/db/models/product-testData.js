import { productModel } from "./product-model.js";
import { productService } from "../../services/product-service.js";
import { timeZone } from "../../services/timeZone.js";

const time = timeZone();
async function productModelTest() {
  await productService.addProduct({
    name: "훈제 닭가슴살",
    stock: 200,
    price: 2000,
    company: "맛있닭",
    categoryId: "1",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "생 닭가슴살",
    stock: 200,
    price: 2000,
    company: "신선닭",
    categoryId: "1",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "소프트 닭 안심",
    stock: 200,
    price: 2000,
    company: "맛있닭",
    categoryId: "1",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "돼지고기 뒷다리살",
    stock: 270,
    price: 8000,
    company: "푸드트립",
    categoryId: "3",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "한돈 소시지",
    stock: 270,
    price: 8000,
    company: "쿠킹유",
    categoryId: "3",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "벌집 삼겹살",
    stock: 270,
    price: 8000,
    company: "푸드트립",
    categoryId: "3",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "소고기볼 오리지널",
    stock: 200,
    price: 2000,
    company: "blackCow",
    categoryId: "5",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "설도 슬라이스",
    stock: 200,
    price: 2000,
    company: "blackCow",
    categoryId: "5",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "소고기 스테이크",
    stock: 200,
    price: 2000,
    company: "blackCow",
    categoryId: "5",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "게맛살 펌킨 샐러드",
    stock: 200,
    price: 2000,
    company: "폴업샐러드",
    categoryId: "6",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "너트 리코타 샐러드",
    stock: 200,
    price: 2000,
    company: "폴업샐러드",
    categoryId: "6",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "과일콥 올리브 샐러드",
    stock: 200,
    price: 2000,
    company: "폴업샐러드",
    categoryId: "6",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "밀푀유나베",
    stock: 200,
    price: 2000,
    description: "풍성한 맛이 나는 밀푀유 나베",
    company: "신선애",
    categoryId: "7",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "차이797 양장피",
    stock: 200,
    price: 2000,
    description: "셰프의 특제소스를 더한 고급 중화 요리",
    company: "차이797",
    categoryId: "7",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "기사식당 돼지 불고기",
    stock: 200,
    price: 2000,
    description: "달달하고 단백질까지 챙긴 그 때 그 맛 불고기",
    company: "프레시지",
    categoryId: "7",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "닥터유 단백질음료",
    stock: 200,
    price: 2000,
    company: "닥터유",
    categoryId: "4",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "퍼펙트 파워쉐이크",
    stock: 200,
    price: 2000,
    company: "칼로바이",
    categoryId: "4",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "프로틴 Rush",
    stock: 200,
    price: 2000,
    company: "러쉬",
    categoryId: "4",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
}

export { productModelTest };
