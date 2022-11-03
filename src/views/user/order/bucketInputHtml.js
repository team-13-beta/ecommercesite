import renderBucketData from "./renderBucketData.js";

// TODO : 총 결제 금액 수량, 개 당 가격 여기서 계산하기
function bucketInputHtml() {
  const box = document.querySelector(".product-box");
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const value = window.localStorage.getItem(`${i}item`);

    const obj = JSON.parse(value);
    console.log(obj);
    if (obj) {
      const htmlStr = renderBucketData(obj.name, obj.stock);
      // html에 추가
      let el = document.createElement("div");
      el.innerHTML = htmlStr;
      box.append(el);
    }
  }

  // 로컬 스토리지 데이터 총 결제 금액 불러오기
  const priceEl = document.querySelector(".total-price");
  priceEl.innerText = `${window.localStorage.getItem("total-price")}`;
}

bucketInputHtml();
