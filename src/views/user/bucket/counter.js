const minusBtn = document.querySelectorAll(".minus-btn");
const plusBtn = document.querySelectorAll(".plus-btn");
const stockEl = document.querySelectorAll(".stock-value");
const totalPriceEl = document.querySelectorAll(".total-price");
const priceEl = document.querySelectorAll(".price-value");

function handleCount(e, idx) {
  const oper = e.target.textContent;
  if (oper === "+") {
    let val = parseInt(stockEl[idx].textContent);
    val += 1;
    stockEl[idx].innerText = `${val}`;
    totalPriceEl[idx].innerText = `${parseInt(priceEl[idx].textContent) * val}`;
  } else {
    let val = parseInt(stockEl[idx].textContent);
    if (val > 1) {
      val -= 1;
      stockEl[idx].innerText = `${val}`;
      totalPriceEl[idx].innerText = `${
        parseInt(priceEl[idx].textContent) * val
      }`;
    }
  }
}

for (let i = 0; i < minusBtn.length; i++) {
  minusBtn[i].addEventListener("click", (event) => {
    handleCount(event, i);
  });
  plusBtn[i].addEventListener("click", (event) => {
    handleCount(event, i);
  });
}
