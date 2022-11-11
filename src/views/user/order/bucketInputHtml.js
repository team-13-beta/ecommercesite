import renderBucketData from "./renderBucketData.js";

function bucketInputHtml() {
  const box = document.querySelector(".product-box");
  let totalPrice = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (Number.isInteger(parseInt(key))) {
      const item = JSON.parse(window.localStorage.getItem(key));

      if (item) {
        if (item.checked === true) {
          totalPrice += parseInt(item.price) * parseInt(item.stock);
          const htmlStr = renderBucketData(item.name, item.stock, item.price);
          // html에 추가
          let el = document.createElement("div");
          el.classList.add("card-content", "bucket-item-content");
          el.innerHTML = htmlStr;
          box.after(el);
        }
      }
    }
  }

  // 로컬 스토리지 데이터 총 결제 금액 계산 후 붙이기
  const priceEl = document.querySelectorAll(".total-price");

  priceEl.forEach(
    (price) => (price.innerText = `${totalPrice.toLocaleString("ko-KR")}원`),
  );
}

bucketInputHtml();
