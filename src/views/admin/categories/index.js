import { createElement, clearContainer } from "../../utility/documentSelect.js";
import { tableTemplate } from "../components/tableTemplate.js";

const CATEGORIES_COLUMNS = [["category_name", "카테고리 이름"]];

export default function Categories({ $app, initialState }) {
  this.state = initialState;

  this.$element = createElement("div"); // closuer가 발동되어서 사용됨.

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element); // table만 초기화 하면 됨. $table을 초기화 하고, search나 검색을 추가할 것.

    this.$element.insertAdjacentHTML(
      "afterbegin",
      tableTemplate(CATEGORIES_COLUMNS),
    );

    $app.appendChild(this.$element);
  };

  this.render = () => {};

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
