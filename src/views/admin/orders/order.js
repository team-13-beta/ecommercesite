import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { tableTemplate } from "../components/tableTemplate.js";

const ORDER_COLUMNS = [
  ["id", "주문 아이디"],
  ["consumerName", "주문자 이름"],
  ["phoneNumber", "전화 번호"],
  ["status", "배송 상태"],
  ["detail_button", "상세정보 가기"],
];

export default function Orders({ $app, initialState, onChange, onClick }) {
  this.state = initialState;

  this.$element = createElement("div");

  const $optionHeader = createElement("div");
  const $orderSearch = createElement("input"); // id 검색
  $orderSearch.className = "order-search";
  const $orderSearchButton = createElement("button");
  $orderSearchButton.innerText = "검색하기";
  $orderSearchButton.addEventListener("click", () =>
    onClick($orderSearch.value.trim()),
  );

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);
    $optionHeader.appendChild($orderSearch);
    $optionHeader.appendChild($orderSearchButton);
    this.$element.appendChild($optionHeader);

    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(ORDER_COLUMNS, this.state),
    );

    const $table = this.$element.querySelector("table");

    appendDetailMoveHandler($table);

    $app.appendChild(this.$element);
  };

  this.render = () => {
    const table = this.$element.querySelector("table");
    console.log(this.state);
    if (table) table.innerHTML = tableTemplate(ORDER_COLUMNS, this.state);
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
