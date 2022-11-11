// 장바구니 데이터 가져오는 파일

import renderBucketData from "./renderBucketData.js";
import calcTotalPrice from "./calcTotalPrice.js";

let bucketDataEl = document.getElementById("bucket-data");
const totalPriceEl = document.querySelector("#total-price");
import { getImageUrl } from "/aws-s3.js";
async function handleData() {
  for (let i = 0; i < window.localStorage.length; i++) {
    // 로컬 데이터 가져오기
    const key = window.localStorage.key(i);

    if (Number.isInteger(parseInt(key))) {
      const bucketData = JSON.parse(window.localStorage.getItem(key));

      const [id, img, name, price, stock] = [
        bucketData.id,
        bucketData.img,
        bucketData.name,
        bucketData.price,
        bucketData.stock,
      ];

      // 페이지에 뿌려준다.
      console.log(img);
      const [img_url] = await Promise.all([getImageUrl(img)]);
      const htmlStr = renderBucketData(id, img_url, name, price, stock);
      let el = document.createElement("div");
      el.classList.add("columns", "item-box", "bu-item-center");
      el.id = `${id}`;
      el.style.margin = "0";
      el.innerHTML = htmlStr;
      bucketDataEl.append(el);
    }
  }

  let totalPrice = calcTotalPrice();

  totalPriceEl.innerText = `${totalPrice.toLocaleString("ko-KR")}원`;

  // 렌더링이 되면 스크립트 파일을 추가한다.
  const counterEl = document.createElement("script");
  counterEl.setAttribute("src", "counter.js");
  counterEl.setAttribute("type", "module");
  document.querySelector("body").appendChild(counterEl);

  const deletteEl = document.createElement("script");
  deletteEl.setAttribute("src", "deleteItem.js");
  document.querySelector("body").appendChild(deletteEl);

  const checkBucket = document.createElement("script");
  checkBucket.setAttribute("src", "checkBoxBucket.js");
  checkBucket.setAttribute("type", "module");
  document.querySelector("body").appendChild(checkBucket);

  const calcCheckBucket = document.createElement("script");
  calcCheckBucket.setAttribute("src", "calcCheckPrice.js");
  calcCheckBucket.setAttribute("type", "module");
  document.querySelector("body").appendChild(calcCheckBucket);
}

// html이 로드되면
window.onload = handleData;
