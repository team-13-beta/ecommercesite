import renderBucketData from "./renderBucketData.js";

let dataEl = document.getElementById("bucket-data");

async function handleData() {
  await fetch("../tempBucketData.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
        el.innerHTML = htmlStr;
        dataEl.append(el);
      }

      const srcEl = document.createElement("script");
      srcEl.setAttribute("src", "counter.js");
      document.querySelector("body").appendChild(srcEl);
    });
}

window.onload = function () {
  handleData();
};
