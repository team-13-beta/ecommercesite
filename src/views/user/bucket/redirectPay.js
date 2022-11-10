const payBtn = document.querySelector(".pay-btn");

// TODO : 주문페이지로 넘어갈때 로그인 안되어있으면 login 페이지로 이동
function handleMove() {
  console.log("click");
  if (sessionStorage.getItem("token")) window.location.href = "/user/order";
  else window.location.href = "/login";

  // window.location.href = "/user/order";
}

payBtn.addEventListener("click", handleMove);
