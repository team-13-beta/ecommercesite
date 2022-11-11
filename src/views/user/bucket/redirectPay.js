const payBtn = document.querySelector(".pay-btn");

function handleMove() {
  console.log("click");
  if (sessionStorage.getItem("token")) window.location.href = "/user/order";
  else window.location.href = "/login";
}

payBtn.addEventListener("click", handleMove);
