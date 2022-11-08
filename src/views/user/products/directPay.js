const directBtnEl = document.querySelector(".direct-pay");
const itemName1El = document.querySelector(".item-name");
const itemPrice1El = document.querySelector(".item-price");
const itemImg1El = document.querySelector("#item-img");
const itemId1El = document.querySelector("#item-id");
const selectValue1El = document.querySelector("#select-value");
// TODO : 바로구매 상품 로컬에 저장하고 보내기

function handleOrder() {
  const value = parseInt(
    selectValue1El.options[selectValue1El.selectedIndex].value,
  );
  const obj = {
    id: `${itemId1El.textContent}`,
    img: `${itemImg1El.src}`,
    name: `${itemName1El.textContent}`,
    price: `${itemPrice1El.textContent}`,
    stock: `${value}`,
  };
  window.localStorage.setItem(`${itemId1El.textContent}`, JSON.stringify(obj));

  if (sessionStorage.getItem("token")) window.location.href = "/user/order";
  else window.location.href = "/login";
}
directBtnEl.addEventListener("click", handleOrder);
