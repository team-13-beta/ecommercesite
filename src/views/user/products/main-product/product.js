import renderProducts from "./renderProducts.js";

let contentEl = document.getElementById("input-products");

async function handleData() {
  await fetch("../../tempData.json")
    .then((res) => res.json())
    .then((data) => {
      const temp = data;
      console.log(temp);
      for (let i = 0; i < temp.length; i++) {
        const [id, img, name, price] = [
          temp[i].product_id,
          temp[i].imgTitle,
          temp[i].name,
          temp[i].price,
        ];
        const htmlStr = renderProducts(img, name, price);
        let el = document.createElement("div");
        el.classList.add("column");
        el.innerHTML = htmlStr;
        contentEl.append(el);
      }
    });
}

window.onload = function () {
  handleData();
};
