const checkBoxEl = document.querySelectorAll(
  '.item-box > input[type="checkbox"]',
);
const checkBoxAllEl = document.querySelector("#checkBoxAll");
const checkItems = document.querySelectorAll('input[type="checkbox"]');
const totalPricelEl = document.querySelector("#total-price");

function handleCheckPrice(e) {
  const nowTotalPriceEl = totalPricelEl.textContent;
  const nowTotalPrice = parseInt(nowTotalPriceEl.replace(/,/g, ""));
  console.log(nowTotalPrice);
  const itemPrice = parseInt(
    e.target.parentElement
      .querySelector(".item-total-price")
      .textContent.replace(/,/g, ""),
  );
  console.log(itemPrice);
  // 부분 선택 가격 계산
  if (e.target.checked) {
    totalPricelEl.innerText = `${(nowTotalPrice + itemPrice).toLocaleString(
      "ko-KR",
    )}원`;
  } else {
    totalPricelEl.innerText = `${(nowTotalPrice - itemPrice).toLocaleString(
      "ko-KR",
    )}원`;
  }
}

function handleCheckAllPrice() {
  // 전체 해제 0원

  if ([...checkItems].every((item) => !item.checked)) {
    totalPricelEl.innerText = "0원";
  }

  // 전체 선택
  if ([...checkItems].every((item) => item.checked)) {
    let totalPrice = 0;
    checkBoxEl.forEach((item) => {
      totalPrice += parseInt(
        item.parentElement.childNodes[13].textContent.replace(/,/g, ""),
      );
    });
    totalPricelEl.innerText = `${totalPrice.toLocaleString("ko-KR")}원`;
  }
}

checkBoxEl.forEach((checkItem) => {
  checkItem.addEventListener("click", handleCheckPrice);
});
checkBoxAllEl.addEventListener("click", handleCheckAllPrice);
