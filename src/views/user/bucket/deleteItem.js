const deleteBtn = document.querySelectorAll(".del-btn");
const itemEl = document.querySelectorAll(".item-box");
function handleDelete(event, idx) {
  // 로컬 스토리지 아이템 삭제
  const valueString = window.localStorage.getItem(`${idx}item`);
  const valueObj = JSON.parse(valueString);
  console.log(valueObj);

  window.localStorage.removeItem(`${i}item`);
  itemEl[idx].innerHTML = "";
}

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (event) => {
    handleDelete(event, i);
  });
}
