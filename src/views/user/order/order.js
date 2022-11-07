import renderOrderData from "./renderOrderData.js";

const modalEl = document.querySelector("#modal-payment");
const paymentBtnEl = document.querySelector("#paymentBtn");
const modalCloseBtnEl = document.querySelector("#modal-close");
const backEl = document.querySelector(".modal-bg");
const orderInfoEl = document.querySelector(".order-info");
function openModal() {
  modalEl.classList.remove("is-close");
}

function closeModal() {
  modalEl.classList.add("is-close");
}

function handleUserData() {
  // TODO : 유저 정보 데이터 가져오기
  // get /orders/:user-id
  const divEl = document.createElement("div");
  divEl.classList.add("card-content");
  divEl.innerHTML = renderOrderData();
  orderInfoEl.after(divEl);
}

window.onload = function () {
  handleUserData();

  paymentBtnEl.addEventListener("click", openModal);
  modalCloseBtnEl.addEventListener("click", closeModal);
  backEl.addEventListener("click", closeModal);
};
