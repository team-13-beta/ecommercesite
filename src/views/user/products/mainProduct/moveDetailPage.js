const productsEl = document.querySelectorAll(".product-item");

function handleMove(e) {
  console.log(e.currentTarget);
  console.log(e.currentTarget.childNodes[1].textContent);
  const product_id = e.currentTarget.childNodes[1].textContent;
  window.location.href =
    "http://127.0.0.1:5501/src/views/user/products/detailProduct/productDetail.html";
}

productsEl.forEach((product) => {
  product.addEventListener("click", handleMove);
});
