const sendOrderEl = document.querySelector("#send-order");

function handleSend() {
  // TODO : 주문 생성 post

  // TODO : 성공시 이동 실패시 경고
  // TODO : 성공하면 로컬 비우기
  window.localStorage.clear();
  window.location.href = "/user/order/success";
}
sendOrderEl.addEventListener("click", handleSend);
