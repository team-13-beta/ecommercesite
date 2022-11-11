const bucketBtnEl = document.querySelector(".bucket-btn");
const itemNameEl = document.querySelector(".item-name > span");
const itemPriceEl = document.querySelector(".item-price > span");
const itemImgEl = document.querySelector("#item-img");
const itemIdEl = document.querySelector("#item-id");
const selectValueEl = document.querySelector("#select-value");

let str = itemPriceEl.textContent;
const price = parseInt(str.replace(/,/g, ""));

function handleSave() {
  const value = parseInt(
    selectValueEl.options[selectValueEl.selectedIndex].value,
  );
  console.log(itemNameEl.textContent, itemPriceEl.textContent);

  const obj = {
    id: `${itemIdEl.textContent}`,
    img: `${itemImgEl.title}`,
    name: `${itemNameEl.textContent}`,
    price: `${price}`,
    stock: `${value}`,
    checked: true,
  };
  if (window.localStorage.getItem(`${itemIdEl.textContent}`)) {
    alert("장바구니에 같은 상품이 있습니다!");
  } else {
    window.localStorage.setItem(`${itemIdEl.textContent}`, JSON.stringify(obj));
    const result = confirm(
      "장바구니에 상품이 담겼습니다! 장바구니로 이동하시겠습니까?",
    );
    if (result) window.location.href = "/user/bucket";
  }
}

bucketBtnEl.addEventListener("click", handleSave);
