import { createElement } from "../../utility/documentSelect.js";

export function tableTemplate(columns, datas) {
  const $thead = createElement("thead");
  const $theadRow = createElement("tr");
  for (const column of columns) {
    const $td = createElement("td");
    $td.innerHTML = column;
    $theadRow.appendChild($td);
  }
  $thead.appendChild($theadRow);
  const $tbody = createElement("tbody");

  return `
    <table>
      <thead>
        ${$thead.innerHTML}
      </thead>
      <tbody>
        ${$tbody.innerHTML}
      </tbody>
    </table>
  `;
}
