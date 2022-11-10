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
    summary: "맛있는 프로틴 훈제 닭가슴살",
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
    summary: "신선한 비린내 없는 생 닭가슴살",
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
    summary: "부드러운 스팀 처리 된 닭 안심",
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
    summary: "부드러운 돼지고기 뒷다리살",
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
    summary: "저지방 한돈 소시지",
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
    summary: "통 큰 통 벌집 삼겹살",
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
    summary: "고단백 소고기볼 오리지널",
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
    summary: "신선하고 지방이 적은 설도 슬라이스",
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
    summary: "훈제향이 솔솔 나는 소고기 스테이크",
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
    summary: "달달한 단호박이 들어간 샐러드",
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
    summary: "고소한 견과류가 들어간 샐러드",
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
    summary: "상큼한 과일이 들어간 샐러드",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });

  await productService.addProduct({
    name: "밀푀유나베",
    stock: 200,
    price: 2000,
    company: "신선애",
    categoryId: "7",
    summary: "풍성한 맛이 나는 밀푀유 나베",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "차이797 양장피",
    stock: 200,
    price: 2000,
    company: "차이797",
    categoryId: "7",
    summary: "셰프의 특제소스를 더한 고급 중화 요리",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
  await productService.addProduct({
    name: "기사식당 돼지 불고기",
    stock: 200,
    price: 2000,
    company: "프레시지",
    categoryId: "7",
    summary: "달달하고 단백질까지 챙긴 그 때 그 맛 불고기",
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
    summary: "건강하고 맛있는 단백질 음료",
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
    summary: "김종국의 퍼펙트한 프로틴",
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
    summary: "프로틴 Rush 달콤 고소 합니다!",
    nutritionImage: "asdfasdf",
    deliveryImage: "qewrqwer",
    detailImage: "zxcvzxcv",
    titleImage: "liasdfasdfuhqwe",
  });
}

export { productModelTest };
