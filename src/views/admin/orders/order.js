import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { orderHeaderTemplate } from "../components/orderTemplate.js";
import { tableTemplate } from "../components/tableTemplate.js";

const ORDER_COLUMNS = [
  ["id", "주문 아이디"],
  ["consumerName", "주문자 이름"],
  ["phoneNumber", "전화 번호"],
  ["status", "배송 상태"],
  ["detail_button", "상세정보 가기"],
];

export default function Orders({ $app, initialState, searchHandler }) {
  this.state = initialState;

  this.$element = createElement("div");

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type, detailId } = e.target.dataset;
    console.log(type, detailId, e.target.dataset);
    if (type === "detail") {
      appendDetailMoveHandler(detailId, this.state, "OrderDetails");
    }
  });
  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);

    this.$element.innerHTML = orderHeaderTemplate();
    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(ORDER_COLUMNS, this.state),
    );

    const $inputVal = this.$element.querySelector(".order-search");
    this.$element
      .querySelector(".search")
      .addEventListener("click", (e) => searchHandler($inputVal.value));

    $app.appendChild(this.$element);
    this.render();
  };

  this.render = () => {
    const $table = this.$element.querySelector("table");
    if ($table) {
      $table.innerHTML = tableTemplate(ORDER_COLUMNS, this.state);
    }
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
