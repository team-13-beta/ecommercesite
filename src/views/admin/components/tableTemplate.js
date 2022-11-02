import { createElement } from "../../utility/documentSelect.js";

export function tableTemplate(columns, datas = []) {
  const $thead = createElement("thead");
  const $theadRow = createElement("tr");

  const $tbody = createElement("tbody");
  for (const [key, value] of columns) {
    const $td = createElement("td");
    $td.innerHTML = value;
    $theadRow.appendChild($td);
  }
  $thead.appendChild($theadRow);

  console.log(datas);
  for (const data of datas) {
    const $tr = createElement("tr");
    for (const [key, _] of columns) {
      const $td = createElement("td");
      if (key === "detail_button") {
        $td.innerHTML = `<button data-detail-id=${data["id"]}>상세 정보</button>`;
      } else {
        $td.innerHTML = data[key] ?? "";
      }
      $tr.appendChild($td);
    }

    $tbody.appendChild($tr);
  }

  return `
    <table>
      ${$thead.outerHTML}
      ${$tbody.outerHTML}
    </table>
  `;
}
