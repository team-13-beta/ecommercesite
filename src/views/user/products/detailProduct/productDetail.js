import renderDetailData from "./renderDetailData.js";
import productDesData from "./productDesData.js";

let contentEl = document.getElementById("input-data");
let detailEl = document.getElementById("detail-data");
async function handleData() {
  // 상품 아이디 가져와서 서버에 get 요청
  await fetch("../../tempData.json")
    .then((res) => res.json())
    .then((data) => {
      const temp = data[0];
      console.log(temp);
      const [id, img, name, price, [des, des_img]] = [
        temp.product_id,
        temp.imgTitle,
        temp.name,
        temp.price,
        temp.description,
      ];
      const htmlEl = renderDetailData(id, img, name, price, des);
      contentEl.innerHTML = htmlEl;

      const html2El = productDesData(des_img);
      detailEl.innerHTML = html2El;

      const counterEl = document.createElement("script");
      counterEl.setAttribute("src", "saveItemLocal.js");
      document.querySelector("body").appendChild(counterEl);
    });
}

window.onload = handleData;
