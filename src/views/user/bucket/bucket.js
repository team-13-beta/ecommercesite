// 장바구니 데이터 가져오는 파일

import renderBucketData from "./renderBucketData.js";

let dataEl = document.getElementById("bucket-data");

async function handleData() {
  await fetch("../tempBucketData.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const dataString = JSON.stringify(data[i]);
        // 로컬 스토리지에 저장
        window.localStorage.setItem(`${i}item`, dataString);
        const [img, name, price, stock] = [
          data[i].imgTitle,
          data[i].name,
          data[i].price,
          data[i].stock,
        ];

        // 페이지에 데이터를 뿌려준다.
        const htmlStr = renderBucketData(img, name, price, stock);
        let el = document.createElement("div");
        el.classList.add("columns");
        el.classList.add("item-box");
        el.innerHTML = htmlStr;
        dataEl.append(el);
      }

      // 렌더링이 되면 스크립트 파일을 추가한다.
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
