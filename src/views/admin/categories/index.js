import { createElement, clearContainer } from "../../utility/documentSelect.js";

const CATEGORIES_COLUMNS = ["카테고리 이름"];

export default function Categories({ $app }) {
  // this.state = initialState;
  this.$element = createElement("div");

  const $table = createElement("table");
  const $thead = createElement("thead");

  this.init = () => {
    // if (history.state === null) return;
    clearContainer($app);

    if ($app.firstChild) return;
    console.log($app, $app.firstChild);

    const $theadRow = createElement("tr");

    for (const column of CATEGORIES_COLUMNS) {
      const $td = createElement("td");
      $td.innerHTML = column;
      $theadRow.appendChild($td);
    }

    $thead.appendChild($theadRow);

    $table.appendChild($thead);
    this.$element.appendChild($table);
    $app.appendChild(this.$element);
  };

  // this.init();
}
