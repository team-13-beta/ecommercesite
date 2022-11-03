const modalEl = document.querySelector("#modal-payment");
const paymentBtnEl = document.querySelector("#paymentBtn");
const modalCloseBtnEl = document.querySelector("#modal-close");
const backEl = document.querySelector(".modal-bg");

function openModal() {
  console.log();
  modalEl.classList.remove("is-close");
}

function closeModal() {
  modalEl.classList.add("is-close");
}

window.onload = function () {
  paymentBtnEl.addEventListener("click", openModal);
  modalCloseBtnEl.addEventListener("click", closeModal);
  backEl.addEventListener("click", closeModal);
};
