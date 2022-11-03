// 장바구니 데이터 가져오는 파일

import renderBucketData from "./renderBucketData.js";

let dataEl = document.getElementById("bucket-data");

function handleData() {
  for (let i = 0; i < window.localStorage.length; i++) {
    // 로컬 데이터 가져오기
    const key = window.localStorage.key(i);
    const valueStr = window.localStorage.getItem(key);
    const valueObj = JSON.parse(valueStr);
    console.log(valueObj);
  }
}

// html이 로드되면
window.onload = function () {
  handleData();
};
