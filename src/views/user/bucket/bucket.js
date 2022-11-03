// 장바구니 데이터 가져오는 파일

import renderBucketData from "./renderBucketData.js";

let dataEl = document.getElementById("bucket-data");

async function handleData() {
  await fetch("../tempBucketData.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        const [img, name, price, stock] = [
          data[i].imgTitle,
          data[i].name,
          data[i].price,
          data[i].stock,
        ];

        const htmlStr = renderBucketData(img, name, price, stock);
        let el = document.createElement("div");
        el.classList.add("columns");
        el.classList.add("item-box");
        el.innerHTML = htmlStr;
        dataEl.append(el);
      }

      const counterEl = document.createElement("script");
      counterEl.setAttribute("src", "counter.js");
      document.querySelector("body").appendChild(counterEl);

      const deletteEl = document.createElement("script");
      deletteEl.setAttribute("src", "deleteItem.js");
      document.querySelector("body").appendChild(deletteEl);
    });
}

// html이 로드되면
window.onload = function () {
  handleData();
};
