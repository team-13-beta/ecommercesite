import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { categoryHeader } from "../components/categoryHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";

import { categoryModal, closeModal } from "../components/modal.js";

const CATEGORIES_COLUMNS = [["category_name", "카테고리 이름"]];

export default function Categories({
  $app,
  initialState,
  searchHandler,
  appendHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div"); // closuer가 발동되어서 사용됨.

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);
    // table만 초기화 하면 됨. $table을 초기화 하고, search나 검색을 추가할 것.
    this.$element.innerHTML = categoryHeader();
    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(CATEGORIES_COLUMNS, this.state),
    );

    const $inputVal = this.$element.querySelector(".category-search");

    this.$element
      .querySelector(".search")
      .addEventListener("click", (e) => searchHandler($inputVal.value));

    this.$element.querySelector(".append").addEventListener("click", () => {
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
    });

    $app.appendChild(this.$element);
  };

  this.render = () => {
    const table = this.$element.querySelector("table");
    console.log(this.state, "category render");
    if (table) table.innerHTML = tableTemplate(CATEGORIES_COLUMNS, this.state);
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
