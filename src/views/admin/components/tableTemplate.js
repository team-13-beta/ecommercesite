import { createElement } from "../../utility/documentSelect.js";

export function tableTemplate(columns, datas = [], categories = []) {
  const $thead = createElement("thead");
  const $theadRow = createElement("tr");
  const $tbody = createElement("tbody");

  for (const [key, value] of columns) {
    const $td = createElement("td");
    $td.innerHTML = value;
    $theadRow.appendChild($td);
  }
  $thead.appendChild($theadRow);

  for (const data of datas) {
    const $tr = createElement("tr");
    for (const [key] of columns) {
      const $td = createElement("td");
      switch (key) {
        case "detailButton":
          $td.innerHTML = `<button class="button is-small" data-type="detail" data-detail-id=${data["id"]}>상세 정보</button>`;
          break;
        case "updateButton":
          $td.innerHTML = `<button class="button is-small" data-type="update" data-detail-id=${data["id"]}>수정하기</button>`;
          break;
        case "categoryId":
          const { name } = categories.find(
            (category) => category.id == data[key],
          ) ?? { name: "none" };
          $td.innerHTML = name;
          break;
        default:
          $td.innerHTML = data[key] ?? "";
          break;
      }

      $tr.appendChild($td);
    }

    $tbody.appendChild($tr);
  }

  return `
    <table class="table is-fullwidth">
      ${$thead.outerHTML}
      ${$tbody.outerHTML}
    </table>
  `;
}
