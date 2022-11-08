import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { categoryHeader } from "../components/category/categoryHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";

import {
  categoryAppendModal,
  categoryUpdateModal,
  closeModal,
} from "../components/modal.js";

const CATEGORIES_COLUMNS = [
  ["id", "카테고리 아이디"],
  ["name", "카테고리 이름"],
  ["updateButton", "수정하기"],
];

export default function Categories({
  $app,
  initialState,
  searchHandler,
  appendHandler,
  deleteHandler,
  updateHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div"); // closuer가 발동되어서 사용됨.

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type, detailId } = e.target.dataset;
    switch (type) {
      case "search":
        const $inputVal = this.$element.querySelector(".search-input");
        searchHandler($inputVal.value);
        break;
      case "append":
        appendModalHandler();
        break;
      case "update":
        updateModalHandler(detailId);
        break;
      default:
        return;
    }
  });

  const appendModalHandler = () => {
    const $modalLayout = createElement("div");
    $modalLayout.setAttribute("class", "modal is-active");
    $modalLayout.innerHTML = categoryAppendModal;
    document.querySelector("body").prepend($modalLayout);

    const $modalClose = $modalLayout.querySelector(".close-button");
    const $categoryAppend = $modalLayout.querySelector(".category-append");
    const $categoryInput = $modalLayout.querySelector(".category-input");

    $categoryAppend.addEventListener("click", (e) =>
      appendHandler({
        id: Date.now() + "",
        name: $categoryInput.value,
      }),
    );
    $modalClose.addEventListener("click", closeModal);
  };
  const updateModalHandler = (detailId) => {
    const targetCategory = this.state.find(
      (category) => category.id === detailId,
    );
    if (!targetCategory) {
      alert("존저해지 않는 카테고리입니다");
      return;
    }
    const $modalLayout = createElement("div");
    $modalLayout.setAttribute("class", "modal is-active");
    $modalLayout.innerHTML = categoryUpdateModal(targetCategory);
    document.querySelector("body").prepend($modalLayout);

    $modalLayout.addEventListener("click", (e) => {
      const { type } = e.target.dataset;
      switch (type) {
        case "modalClose":
          closeModal();
          break;
        case "categoryDelete":
          if (confirm("정말 삭제하시겠습니까?")) deleteHandler(detailId);
          break;
        case "categoryUpdate":
          const $categoryInput = $modalLayout.querySelector(".category-input");
          updateHandler({
            id: detailId,
            name: $categoryInput.value,
          });
          break;
        default:
          return;
      }
    });
  };
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
