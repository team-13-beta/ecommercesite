import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { categoryHeader } from "../components/category/categoryHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";

import { categoryModal, closeModal } from "../components/modal.js";

const CATEGORIES_COLUMNS = [
  ["category_name", "카테고리 이름"],
  ["delete_button", "삭제하기"],
];

export default function Categories({
  $app,
  initialState,
  searchHandler,
  appendHandler,
  deleteHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div"); // closuer가 발동되어서 사용됨.

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type, detailId } = e.target.dataset;
    if (type === "search") {
      const $inputVal = this.$element.querySelector(".search-input");
      searchHandler($inputVal.value);
    } else if (type === "append") {
      modalHandler();
    } else if (type === "delete") {
      if (confirm("정말 삭제하시겠습니까?")) deleteHandler(detailId);
    }
  });

  function modalHandler() {
    const $modalLayout = createElement("div");
    $modalLayout.setAttribute("class", "modal__layout");
    $modalLayout.innerHTML = categoryModal;
    document.querySelector("body").prepend($modalLayout);

    const $modalClose = $modalLayout.querySelector(".close-button");
    const $categoryAppend = $modalLayout.querySelector(".category-append");
    const $categoryInput = $modalLayout.querySelector(".category-input");

    $categoryAppend.addEventListener("click", (e) =>
      appendHandler({
        category_id: Date.now() + "",
        category_name: $categoryInput.value,
      }),
    );
    $modalClose.addEventListener("click", closeModal);
  }

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);
    // table만 초기화 하면 됨. $table을 초기화 하고, search나 검색을 추가할 것.
    this.$element.innerHTML = categoryHeader();
    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(CATEGORIES_COLUMNS, this.state),
    );

    $app.appendChild(this.$element);
  };

  this.render = () => {
    const table = this.$element.querySelector("table");

    if (table) table.innerHTML = tableTemplate(CATEGORIES_COLUMNS, this.state);
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
