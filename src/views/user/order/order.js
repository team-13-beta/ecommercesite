function openModal($el) {
  $el.classList.add("is-open");
}

function closeModal($el) {
  $el.classList.remove("is-open");
}

const paymentBtnEl = document.querySelector("#paymentBtn");
const modalCloseBtnEl = document.querySelector("#modal-close");
const modalEl = document.querySelector("#modal-payment");

paymentBtnEl.addEventListener("click", openModal(modalEl));
modalCloseBtnEl.addEventListener("click", closeModal(modalEl));
