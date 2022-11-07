const sendOrderEl = document.querySelector("#send-order");

function handleSend() {
  // TODO : 주문 생성 post
  console.log("click");
  window.location.href = "/user/order/success";
}
sendOrderEl.addEventListener("click", handleSend);
