const deleteBtn = document.querySelectorAll(".del-btn");
const itemEl = document.querySelectorAll(".item-box");
function handleDelete(event, idx) {
  itemEl[idx].innerHTML = "";
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (event) => {
    handleDelete(event, i);
  });
}
