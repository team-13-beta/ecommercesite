const checkBoxEl = document.querySelectorAll(
  '.item-box > input[type="checkbox"]',
);
const checkBoxAllEl = document.querySelector("#checkBoxAll");
const checkItems = document.querySelectorAll('input[type="checkbox"]');
const totalPricelEl = document.querySelector("#total-price");

function handleCheckPrice(e) {
  const nowTotalPrice = parseInt(totalPricelEl.textContent);
  const itemPrice = parseInt(e.target.parentElement.childNodes[13].textContent);
  // 부분 선택 가격 계산
  if (e.target.checked) {
    totalPricelEl.innerText = `${nowTotalPrice + itemPrice}`;
  } else {
    totalPricelEl.innerText = `${nowTotalPrice - itemPrice}`;
  }
}

function handleCheckAllPrice() {
  // 전체 해제 0원
  if ([...checkItems].every((item) => !item.checked)) {
    totalPricelEl.innerText = "0";
  }

  // 전체 선택
  if ([...checkItems].every((item) => item.checked)) {
    let totalPrice = 0;
    checkBoxEl.forEach((item) => {
      totalPrice += parseInt(item.parentElement.childNodes[13].textContent);
    });
    totalPricelEl.innerText = `${totalPrice}`;
  }
}

checkBoxEl.forEach((checkItem) => {
  checkItem.addEventListener("click", handleCheckPrice);
});
checkBoxAllEl.addEventListener("click", handleCheckAllPrice);
