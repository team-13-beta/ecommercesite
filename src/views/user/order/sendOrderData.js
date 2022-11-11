import * as Api from "../../api.js";

const sendOrderEl = document.querySelector("#send-order");
const userNameEl = document.querySelector("#receiverName");
const phoneNumberEl = document.querySelector("#receiverPhoneNumber");
const postalCodeEl = document.querySelector("#postalCode");
const address1El = document.querySelector("#address1");
const address2El = document.querySelector("#address2");

function handleSend() {
  const localData = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (Number.isInteger(parseInt(key))) {
      const data = JSON.parse(window.localStorage.getItem(key));
      if (data.checked) {
        const obj = {
          productId: data.id,
          img: data.img,
          stock: parseInt(data.stock),
          name: data.name,
          price: data.price,
        };
        localData.push(obj);
      }
    }
  }
  console.log("장바구니 데이터 : ", localData);

  const sendData = {
    userName: userNameEl.value,
    phoneNumber: phoneNumberEl.value,
    address: {
      postalCode: postalCodeEl.value,
      address1: address1El.value,
      address2: address2El.value,
    },
    buyingProduct: localData,
  };
  console.log("주문 생성 데이터 : ", sendData);
  const res = Api.post("/api/orders", sendData);
  if (res) {
    window.localStorage.clear();
    window.location.href = "/user/order/success";
  } else {
    alert("주문에 실패했습니다! 다시 확인해주세요");
  }
}
sendOrderEl.addEventListener("click", handleSend);
