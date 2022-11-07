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

      if (key === "detailButton") {
        $td.innerHTML = `<button class="button is-small" data-type="detail" data-detail-id=${data["id"]}>상세 정보</button>`;
      } else if (key === "update_button") {
        $td.innerHTML = `<button class="button is-small" data-type="update" data-detail-id=${data["id"]}>수정하기</button>`;
      } else if (key === "categoryId") {
        const { categoryName } = categories.find(
          (category) => category.id === data[key],
        ) ?? { categoryName: "none" };
        $td.innerHTML = categoryName;
      } else {
        $td.innerHTML = data[key] ?? "";
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
