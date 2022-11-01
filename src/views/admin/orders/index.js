import { createElement, clearContainer } from "../../utility/documentSelect.js";

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

  const $table = createElement("table");

  const tableSetting = () => {
    const $thead = createElement("thead");
    const $theadRow = createElement("tr");

    for (const column of ORDER_COLUMNS) {
      const $td = createElement("td");
      $td.innerHTML = column;
      $theadRow.appendChild($td);
    }
    $thead.appendChild($theadRow);
    $table.appendChild($thead);
  };

  this.init = () => {
    if (history.state === null) return;
    clearContainer($app);
    if ($app.firstChild) return;
    tableSetting();

    this.$element.appendChild($table);
    $app.appendChild(this.$element);
  };
}
