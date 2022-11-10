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
  fetch("/api/userlist", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const [userName, phoneNumber, userAddress] = [
        data.name,
        data.phoneNumber,
        data.address,
      ];

      const userNameEl = document.querySelector("#receiverName");
      const phoneNumberEl = document.querySelector("#receiverPhoneNumber");
      const postalCodeEl = document.querySelector("#postalCode");
      const address1El = document.querySelector("#address1");
      const address2El = document.querySelector("#address2");

      if (data.name) {
        userNameEl.value = userName;
      }

      if (data.phoneNumber) {
        phoneNumberEl.value = phoneNumber;
      }

      if (data.address) {
        postalCodeEl.value = userAddress.postalCode;
        address1El.value = userAddress.address1;
        address2El.value = userAddress.address2;
      }
    });

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

  const searchAddressEl = document.createElement("script");
  searchAddressEl.setAttribute("src", "searchAddress.js");
  searchAddressEl.setAttribute("type", "module");
  document.querySelector("body").appendChild(searchAddressEl);

  const sendOrderEl = document.createElement("script");
  sendOrderEl.setAttribute("src", "sendOrderData.js");
  sendOrderEl.setAttribute("type", "module");
  document.querySelector("body").appendChild(sendOrderEl);
};
