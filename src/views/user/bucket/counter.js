const minusBtn = document.querySelectorAll(".minus-btn");
const plusBtn = document.querySelectorAll(".plus-btn");
const stockEl = document.querySelectorAll(".stock-value");
const itemtotalPriceEl = document.querySelectorAll(".item-total-price");
const priceEl = document.querySelectorAll(".price-value");
const totalPriceEl = document.querySelector("#total-price");

function handleCount(e, idx) {
  const oper = e.target.textContent;
  const nowTotal = parseInt(totalPriceEl.textContent);
  if (oper === "+") {
    let val = parseInt(stockEl[idx].textContent); // 수량
    const priceVal = parseInt(priceEl[idx].textContent); // 현재 제품의 가격
    const nextPlus = parseInt(priceVal) * val; // 수량 증가 시 가격

    // 개당 가격 계산
    val += 1;
    stockEl[idx].innerText = `${val}`;
    itemtotalPriceEl[idx].innerText = `${nextPlus}`;

    // 총 가격 계산
    totalPriceEl.innerText = `${nowTotal + priceVal}`;
  } else {
    let val = parseInt(stockEl[idx].textContent);
    if (val > 1) {
      let val = parseInt(stockEl[idx].textContent); // 수량
      const priceVal = parseInt(priceEl[idx].textContent); // 현재 제품의 가격
      const nextPlus = parseInt(priceVal) * val; // 수량 증가 시 가격

      // 개당 가격 계산
      val -= 1;
      stockEl[idx].innerText = `${val}`;
      itemtotalPriceEl[idx].innerText = `${nextPlus}`;

      // 총 가격 계산
      totalPriceEl.innerText = `${nowTotal - priceVal}`;
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
