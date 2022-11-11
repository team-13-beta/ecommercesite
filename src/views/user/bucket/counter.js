import calcTotalPrice from "./calcTotalPrice.js";

const minusBtn = document.querySelectorAll(".minus-btn");
const plusBtn = document.querySelectorAll(".plus-btn");

const totalPriceEl = document.querySelector("#total-price");

function handleCount(e) {
  // 각 요소 값들

  const parentEl = e.target.parentElement; // 상품 수량 박스
  const quantityEl = parentEl.querySelector(".stock-value");
  let quantityValue = parseInt(quantityEl.textContent); // 현재 수량 값
  const grandParentEl = parentEl.parentElement; // 상품 박스
  const itemPrice = parseInt(
    grandParentEl.querySelector(".price-value").textContent.replace(/,/g, ""),
  ); // 상품 가격

  const itemTotalPriceEl = grandParentEl.querySelector(".item-total-price"); // 상품 총 가격

  const dataIdEl = grandParentEl.id; // 상품의 각 id
  const checkedEl = grandParentEl.querySelector(".checkbox");

  let totalPrice = calcTotalPrice(); // 장바구니 전체 가격
  // 연산자
  const operator = e.target.textContent;

  // 로컬 스토리지 데이터 가져오기
  let bucketData = JSON.parse(window.localStorage.getItem(dataIdEl));

  if (operator === "+") {
    // 상품별 금액 계산
    quantityValue += 1;
    const changePrice = parseInt(itemPrice) * quantityValue;
    quantityEl.innerText = `${quantityValue}`;
    itemTotalPriceEl.innerText = `${changePrice.toLocaleString("ko-KR")}원`;

    // 총 금액 계산
    if (checkedEl.checked) {
      totalPrice += parseInt(itemPrice);
      totalPriceEl.innerText = `${totalPrice.toLocaleString("ko-KR")}원`;
    }
  } else {
    if (quantityValue > 1) {
      quantityValue -= 1;
      const changePrice = parseInt(itemPrice) * quantityValue;
      quantityEl.innerText = `${quantityValue}`;
      itemTotalPriceEl.innerText = `${changePrice.toLocaleString("ko-KR")}원`;

      // 총 금액 계산
      if (checkedEl.checked) {
        totalPrice -= parseInt(itemPrice);
        totalPriceEl.innerText = `${totalPrice.toLocaleString("ko-KR")}원`;
      }
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
