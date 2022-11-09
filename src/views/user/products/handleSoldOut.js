const bucketBtnEl = document.querySelector(".bucket-btn");
const directBtnEl = document.querySelector(".direct-pay");
const selectEl = document.querySelector("#select-value");
const soldEl = document.querySelector("#item-id");

function handleShowSoldOut() {
  const boxEl = document.createElement("div");
  boxEl.classList.add("card-header-title");
  boxEl.textContent = "품절입니다.";

  soldEl.before(boxEl);

  selectEl.setAttribute("disabled", true);
}

function handleAlert() {
  alert("이미 품절된 상품입니다! 빠르게 재고를 준비할게요");
}

bucketBtnEl.addEventListener("click", handleAlert);
directBtnEl.addEventListener("click", handleAlert);
handleShowSoldOut();
