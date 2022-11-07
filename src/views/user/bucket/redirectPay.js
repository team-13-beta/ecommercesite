const payBtn = document.querySelector(".pay-btn");

function handleMove() {
  console.log("click pay");
  window.location.href =
    "http://127.0.0.1:5501/src/views/user/order/order.html";
}

payBtn.addEventListener("click", handleMove);
