const directBtnEl = document.querySelector(".direct-pay");

function handleOrder() {
  if (sessionStorage.getItem("token")) window.location.href = "/user/order";
  else window.location.href = "/login";
}
directBtnEl.addEventListener("click", handleOrder);
