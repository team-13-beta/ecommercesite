import renderDetailData from "./renderDetailData.js";
import productDesData from "./productDesData.js";

let contentEl = document.getElementById("input-data");
let detailEl = document.getElementById("detail-data");
// TODO : 상품 아이디 받아오기
function handleData() {
  // TODO : 상품 아이디 가져와서 서버에 get 요청
  console.log();
  const url = window.location.pathname;
  const product_id = url.split("/")[3];
  console.log(url);
  fetch(`/products/${product_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const [id, name, price, des] = [
        product_id,
        data.name,
        data.price,
        data.description,
      ];

      const htmlEl = renderDetailData(id, name, price, des);
      contentEl.innerHTML = htmlEl;

      //const html2El = productDesData(des_img1, des_img2, des_img3);
      //detailEl.innerHTML = html2El;

      const counterEl = document.createElement("script");
      counterEl.setAttribute("src", "saveItemLocal.js");
      document.querySelector("body").appendChild(counterEl);

      const scrollEl = document.createElement("script");
      scrollEl.setAttribute("src", "tabClickScroll.js");
      document.querySelector("body").appendChild(scrollEl);

      const directEl = document.createElement("script");
      directEl.setAttribute("src", "directPay.js");
      document.querySelector("body").appendChild(directEl);
    });
}

window.onload = handleData;
