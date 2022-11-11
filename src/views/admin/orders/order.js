import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { orderHeaderTemplate } from "../components/order/orderTemplate.js";
import { tableTemplate } from "../components/tableTemplate.js";

const ORDER_COLUMNS = [
  ["id", "주문 아이디"],
  ["userName", "주문자 이름"],
  ["phoneNumber", "전화번호"],
  ["status", "배송 상태"],
  ["detailButton", "상세정보 가기"],
];

export default function Orders({ $app, initialState, searchHandler }) {
  this.state = initialState;

  this.$element = createElement("div");

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type, detailId } = e.target.dataset;
    switch (type) {
      case "detail":
        appendDetailMoveHandler(detailId, this.state, "OrderDetails");
        break;
      case "search":
        const $inputVal = this.$element.querySelector(".search-input");
        searchHandler($inputVal.value);
        break;
      default:
        return;
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
