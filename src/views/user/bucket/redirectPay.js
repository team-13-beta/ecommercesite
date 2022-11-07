const payBtn = document.querySelector(".pay-btn");

function handleMove() {
  console.log("click pay");
  window.location.href = "/user/order";
}

payBtn.addEventListener("click", handleMove);
