import renderData from "./renderData.js";

let contentEl = document.getElementById("input-data");
async function handleData() {
  await fetch("../tempData.json")
    .then((res) => res.json())
    .then((data) => {
      const temp = data[0];
      console.log(temp);
      const [img, name, price, des] = [
        temp.imgTitle,
        temp.name,
        temp.price,
        temp.description[0],
      ];
      const htmlEl = renderData(img, name, price, des);
      contentEl.innerHTML = htmlEl;
    });
}

window.onload = function () {
  handleData();
};
