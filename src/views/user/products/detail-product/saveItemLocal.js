const bucketBtnEl = document.querySelector(".bucket-btn");
const itemNameEl = document.querySelector(".item-title");
const itemPriceEl = document.querySelector(".item-price");
const itemIdEl = document.querySelector("#item-id");
const selectValueEl = document.querySelector("#select-value");

function handleSave() {
  const value = selectValueEl.options[selectValueEl.selectedIndex].value;
  const obj = {
    id: `${itemIdEl.textContent}`,
    name: `${itemNameEl.textContent}`,
    price: `${itemPriceEl.textContent}`,
    stock: `${value}`,
  };
  window.localStorage.setItem(`${itemIdEl.textContent}`, JSON.stringify(obj));
  if (window.localStorage.getItem(`${itemIdEl.textContent}`)) {
    alert("장바구니에 같은 상품이 있습니다!");
  }
}

bucketBtnEl.addEventListener("click", handleSave);
