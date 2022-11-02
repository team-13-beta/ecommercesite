import { clearContainer, createElement } from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { categoryHeader } from "../components/productHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";
import { productModal, closeModal } from "../components/modal.js";
const PRODUCT_COLUMNS = [
  ["id", "상품 아이디"],
  ["productName", "상품명"],
  ["category", "카테고리"],
  ["price", "가격"],
  ["stock", "남은 개수"],
  ["detail_button", "상세정보 가기"],
];

export default function Products({ $app, initialState, onClick }) {
  this.state = initialState;

  this.$element = createElement("div");

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);

    this.$element.innerHTML = categoryHeader();

    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(PRODUCT_COLUMNS, this.state.productLists),
    );

    const $inputVal = this.$element.querySelector(".category-search");

    this.$element
      .querySelector(".search")
      .addEventListener("click", (e) => onClick($inputVal.value));

    const $table = this.$element.querySelector("table");

    appendDetailMoveHandler($table, this.state.productLists, "ProductDetails");

    this.$element.querySelector(".append").addEventListener("click", () => {
      const $modalLayout = createElement("div");
      $modalLayout.setAttribute("class", "modal__layout");
      $modalLayout.innerHTML = productModal(this.state.categoryLists);
      document.querySelector("body").prepend($modalLayout);

      const $modalClose = $modalLayout.querySelector(".close-button");
      const $categoryAppend = $modalLayout.querySelector(".product-append");

      $categoryAppend.addEventListener("click", (e) => {
        e.preventDefault();
        this.setState([
          ...this.state,
          {
            category_id: Date.now() + "",
            category_name: $categoryInput.value,
          },
        ]);
        closeModal();
      });

      $modalClose.addEventListener("click", closeModal);
    });
    $app.appendChild(this.$element);
  };

  this.render = () => {
    const $table = this.$element.querySelector("table");
    const $modalLayout = this.$element.querySelector(".modal__layout");
    if ($table) {
      $table.innerHTML = tableTemplate(
        PRODUCT_COLUMNS,
        this.state.productLists,
      );
    }

    if ($modalLayout) {
      $modalLayout.innerHTML = productModal(this.state.categoryLists);
    }
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
