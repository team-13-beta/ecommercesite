import * as Api from "../../api.js";

const sendOrderEl = document.querySelector("#send-order");
const userNameEl = document.querySelector("#receiverName");
const phoneNumberEl = document.querySelector("#receiverPhoneNumber");
const postalCodeEl = document.querySelector("#postalCode");
const address1El = document.querySelector("#address1");
const address2El = document.querySelector("#address2");
function handleSend() {
  // TODO : 주문 생성 post

  // TODO : 성공시 이동 실패시 경고
  // TODO : 성공하면 로컬 비우기
  // TODO : 이름, 전번, 주소, 장바구니 제품들
  const localData = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (Number.isInteger(parseInt(key))) {
      const data = JSON.parse(window.localStorage.getItem(key));
      const obj = {
        productId: data.id,
        stock: parseInt(data.stock),
        name: data.name,
        price: data.price,
      };
      localData.push(obj);
    }
  }
  console.log(localData);
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
  console.log(sendData);
  const res = Api.post("/orders", sendData);
  if (res) {
    window.localStorage.clear();
    window.location.href = "/user/order/success";
  } else {
    alert("주문에 실패했습니다! 다시 확인해주세요");
  }
}
sendOrderEl.addEventListener("click", handleSend);
