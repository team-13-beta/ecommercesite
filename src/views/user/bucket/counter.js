import calcTotalPrice from "./calcTotalPrice.js";

const minusBtn = document.querySelectorAll(".minus-btn");
const plusBtn = document.querySelectorAll(".plus-btn");

const totalPriceEl = document.querySelector("#total-price");

// TODO : 체크박스가 해제가 될 때 수량을 변경하면 총 금액이 안나오게 해주세요.
function handleCount(e) {
  // 각 요소 값들
  const parentEl = e.target.parentElement;

  const quantityEl = parentEl.childNodes[3];

  let quantityValue = parseInt(quantityEl.textContent);

  const grandParentEl = parentEl.parentElement;
  const itemPrice = grandParentEl.childNodes[9].textContent;
  console.log(grandParentEl.childNodes);
  const itemTotalPriceEl = grandParentEl.childNodes[13];

  const dataIdEl = grandParentEl.id;
  let totalPrice = calcTotalPrice();
  // 연산자
  const operator = e.target.textContent;

  // 로컬 스토리지 데이터 가져오기
  let bucketData = JSON.parse(window.localStorage.getItem(dataIdEl));

  if (operator === "+") {
    // 상품별 금액 계산
    quantityValue += 1;
    const changePrice = parseInt(itemPrice) * quantityValue;
    quantityEl.innerText = `${quantityValue}`;
    itemTotalPriceEl.innerText = `${changePrice}`;

    // 총 금액 계산
    totalPrice += parseInt(itemPrice);
    totalPriceEl.innerText = `${totalPrice}`;
  } else {
    if (quantityValue > 1) {
      quantityValue -= 1;
      const changePrice = parseInt(itemPrice) * quantityValue;
      quantityEl.innerText = `${quantityValue}`;
      itemTotalPriceEl.innerText = `${changePrice}`;

      // 총 금액 계산
      totalPrice -= parseInt(itemPrice);
      totalPriceEl.innerText = `${totalPrice}`;
    }
  }

  // 변경된 수량 로컬에 저장
  bucketData.stock = String(quantityValue);
  window.localStorage.setItem(dataIdEl, JSON.stringify(bucketData));
}

// 아이템 식별
for (let i = 0; i < minusBtn.length; i++) {
  minusBtn[i].addEventListener("click", handleCount);
  plusBtn[i].addEventListener("click", handleCount);
}
