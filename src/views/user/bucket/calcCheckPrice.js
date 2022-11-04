const checkBoxEl = document.querySelectorAll(
  '.item-box > input[type="checkbox"]',
);
const checkBoxAllEl = document.querySelector("#checkBoxAll");
const checkItems = document.querySelectorAll('input[type="checkbox"]');
const totalPricelEl = document.querySelector("#total-price");

function handleCheckPrice() {
  // 부분 선택 가격 계산
  checkBoxEl.forEach((item) => {
    console.log(item.parentElement.childNodes);
    if (!item.checked) {
    }
  });
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
