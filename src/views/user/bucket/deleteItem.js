const deleteBtn = document.querySelectorAll(".del-btn");
const allDeleteBtn = document.querySelector(".all-delete");
const itemEl = document.querySelectorAll(".item-box");
const totalPriceEl = document.querySelector("#total-price");

function handleDelete(e) {
  const dataIdEl = e.target.parentElement.id;
  const delPrice = parseInt(
    e.target.parentElement
      .querySelector(".item-total-price")
      .textContent.replace(/,/g, ""),
  );
  const totalPrice = parseInt(totalPriceEl.textContent.replace(/,/g, ""));
  console.log(delPrice);
  for (let i = 0; i < window.localStorage.length; i++) {
    if (dataIdEl === window.localStorage.key(i)) {
      e.target.parentElement.innerHTML = "";
      window.localStorage.removeItem(dataIdEl);
      totalPriceEl.innerHTML = `${(totalPrice - delPrice).toLocaleString(
        "ko-KR",
      )}원`;
    }
  }
}

function handleAllDelete() {
  const bucketDataEl = document.querySelector("#bucket-data");

  bucketDataEl.innerHTML = "";
  window.localStorage.clear();
  totalPriceEl.innerHTML = "0원";
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}

allDeleteBtn.addEventListener("click", handleAllDelete);
