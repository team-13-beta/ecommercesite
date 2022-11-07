const checkBoxEl = document.querySelectorAll(
  '.item-box > input[type="checkbox"]',
);
const checkBoxAllEl = document.querySelector("#checkBoxAll");

// 하나라도 해제되면 checkBoxAllEl 해제
function handleSelectItem() {
  if (this.checked === false) {
    checkBoxAllEl.checked = false;
  }
  // 하나씩 선택하다 전체가 선택이 되면 checkBoxAllEl 선택
  const checkedEl = document.querySelectorAll(
    '.item-box > input[type="checkbox"]:checked',
  );

  // if (checkBoxEl.length === checkedEl.length) checkBoxAllEl.checked = true;
  // else checkBoxAllEl.checked = false;
  checkBoxAllEl.checked = checkBoxEl.length === checkedEl.length;
}

// 전체 선택, 전체 해제
function handleSelectAll() {
  const checkItems = document.querySelectorAll('input[type="checkbox"]');

  checkItems.forEach((checkItem) => {
    checkItem.checked = this.checked;
  });
}

checkBoxEl.forEach((checkItem) => {
  checkItem.addEventListener("click", handleSelectItem);
});
checkBoxAllEl.addEventListener("click", handleSelectAll);
