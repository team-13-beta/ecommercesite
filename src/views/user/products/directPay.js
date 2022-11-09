const directBtnEl = document.querySelector(".direct-pay");

function handleOrder() {
  window.location.href = "/user/order";
}
directBtnEl.addEventListener("click", handleOrder);
