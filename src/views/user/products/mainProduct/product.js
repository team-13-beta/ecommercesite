import renderProducts from "./renderProducts.js";

let contentEl = document.getElementById("input-products");

async function handleData() {
  await fetch("../../tempData.json")
    .then((res) => res.json())
    .then((data) => {
      const temp = data;

      for (let i = 0; i < temp.length; i++) {
        const [id, img, name, price] = [
          temp[i].product_id,
          temp[i].imgTitle,
          temp[i].name,
          temp[i].price,
        ];
        const htmlStr = renderProducts(id, img, name, price);
        let el = document.createElement("div");
        el.classList.add("column");
        el.innerHTML = htmlStr;
        contentEl.append(el);
      }

      // 렌더링이 되면 스크립트 파일을 추가한다.
      const moveEl = document.createElement("script");
      moveEl.setAttribute("src", "moveDetailPage.js");
      moveEl.setAttribute("type", "module");
      document.querySelector("body").appendChild(moveEl);
    });
}

window.onload = function () {
  handleData();
};
