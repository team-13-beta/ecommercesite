const deleteBtn = document.querySelectorAll(".del-btn");
const itemEl = document.querySelectorAll(".item-box");

function handleDelete(e) {
  const dataIdEl = e.target.parentElement.id;
  for (let i = 0; i < window.localStorage.length; i++) {
    if (dataIdEl === window.localStorage.key(i)) {
      e.target.parentElement.innerHTML = "";
      window.localStorage.removeItem(dataIdEl);
    }
  }
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}
