import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { tableTemplate } from "../components/tableTemplate.js";

const ORDER_COLUMNS = [
  "상품 아이디",
  "주문자 이름",
  "전화 번호",
  "배송 상태",
  "상세정보 가기",
];

export default function Orders({ $app, initialState }) {
  this.state = initialState;

  this.$element = createElement("div");

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);

    this.$element.insertAdjacentHTML(
      "afterbegin",
      tableTemplate(ORDER_COLUMNS),
    );

    const $optionHeader = createElement("div");
    const $orderSearch = createElement("input"); // id 검색

    $optionHeader.appendChild($orderSearch);
    this.$element.insertAdjacentHTML("afterbegin", $optionHeader.innerHTML);

    $app.appendChild(this.$element);
  };

  this.render = () => {};

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
