const modalEl = document.querySelector("#modal-payment");
const paymentBtnEl = document.querySelector("#paymentBtn");
const modalCloseBtnEl = document.querySelector("#modal-close");
const backEl = document.querySelector(".modal-bg");

function openModal() {
  modalEl.classList.remove("is-close");
}

function closeModal() {
  modalEl.classList.add("is-close");
}

function handleUserData() {
  // TODO : 유저 정보 데이터 가져오기
  // get /orders/:user-id
}

window.onload = function () {
  handleUserData();
  paymentBtnEl.addEventListener("click", openModal);
  modalCloseBtnEl.addEventListener("click", closeModal);
  backEl.addEventListener("click", closeModal);
};
