import { clearContainer, createElement } from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { categoryHeader } from "../components/productHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";

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
      tableTemplate(PRODUCT_COLUMNS, this.state),
    );

    const $inputVal = this.$element.querySelector(".category-search");

    this.$element
      .querySelector(".search")
      .addEventListener("click", (e) => onClick($inputVal.value));

    const $table = this.$element.querySelector("table");

    appendDetailMoveHandler($table, this.state, "ProductDetails");

    $app.appendChild(this.$element);
  };

  this.render = () => {
    const $table = this.$element.querySelector("table");
    console.log(this.state, "product render");
    if ($table) {
      $table.innerHTML = tableTemplate(PRODUCT_COLUMNS, this.state);
    }
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
