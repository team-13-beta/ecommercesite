const minusBtn = document.querySelectorAll(".minus-btn");
const plusBtn = document.querySelectorAll(".plus-btn");
const stockEl = document.querySelectorAll(".stock-value");
const itemtotalPriceEl = document.querySelectorAll(".item-total-price");
const priceEl = document.querySelectorAll(".price-value");
const totalPriceEl = document.querySelector("#total-price");

function handleCount(e, idx) {
  const oper = e.target.textContent;
  const nowTotal = parseInt(totalPriceEl.textContent);

  let val = parseInt(stockEl[idx].textContent); // 수량
  const priceVal = parseInt(priceEl[idx].textContent); // 현재 제품의 가격

  // 로컬 스토리지 데이터 확인
  const valueString = window.localStorage.getItem(`${idx}item`);
  const valueObj = JSON.parse(valueString);
  console.log(valueObj);

  if (oper === "+") {
    // 개당 가격 계산
    val += 1;
    const nextPlus = parseInt(priceVal) * val; // 수량 변경 시 가격
    stockEl[idx].innerText = `${val}`;
    itemtotalPriceEl[idx].innerText = `${nextPlus}`;

    // 총 가격 계산
    totalPriceEl.innerText = `${nowTotal + priceVal}`;
  } else {
    if (val > 1) {
      // 개당 가격 계산
      val -= 1;
      const nextPlus = parseInt(priceVal) * val; // 수량 변경 시 가격
      stockEl[idx].innerText = `${val}`;
      itemtotalPriceEl[idx].innerText = `${nextPlus}`;

      // 총 가격 계산
      totalPriceEl.innerText = `${nowTotal - priceVal}`;
    }
  }
  // 로컬 스토리지 수량 변경 후 다시 string 저장
  valueObj.stock = val;
  console.log(valueObj);
  window.localStorage.setItem(`${idx}item`, JSON.stringify(valueObj));
}

// 아이템 식별
for (let i = 0; i < minusBtn.length; i++) {
  minusBtn[i].addEventListener("click", (event) => {
    handleCount(event, i);
  });
  plusBtn[i].addEventListener("click", (event) => {
    handleCount(event, i);
  });
}
