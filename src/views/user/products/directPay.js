const directBtnEl = document.querySelector(".direct-pay");
const itemName1El = document.querySelector(".item-name");
const itemPrice1El = document.querySelector(".item-price");
const itemImg1El = document.querySelector("#item-img");
const itemId1El = document.querySelector("#item-id");
const selectValue1El = document.querySelector("#select-value");

const priceDi = parseInt(itemPrice1El.textContent.replace(/,/g, ""));

function handleOrder() {
  const value = parseInt(
    selectValue1El.options[selectValue1El.selectedIndex].value,
  );
  const obj = {
    id: `${itemId1El.textContent}`,
    img: `${itemImg1El.title}`,
    name: `${itemName1El.textContent}`,
    price: `${priceDi}`,
    stock: `${value}`,
    checked: true,
  };
  window.localStorage.setItem(`${itemId1El.textContent}`, JSON.stringify(obj));

  if (sessionStorage.getItem("token")) window.location.href = "/user/order";
  else window.location.href = "/login";
}
directBtnEl.addEventListener("click", handleOrder);
