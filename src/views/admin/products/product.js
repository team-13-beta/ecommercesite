import {
  clearContainer,
  createElement,
  returnDocumentClass,
  returnDocumentId,
} from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { categoryHeader } from "../components/product/productHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";
import { productModal, closeModal } from "../components/modal.js";

const PRODUCT_COLUMNS = [
  ["id", "상품 아이디"],
  ["productName", "상품명"],
  ["category", "카테고리"],
  ["price", "가격"],
  ["stock", "남은 개수"],
  ["detail_button", "상세정보 가기"],
];

export default function Products({
  $app,
  initialState,
  searchHandler,
  appendHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div");
  const $modalLayout = createElement("div");
  $modalLayout.setAttribute("class", "modal__layout");

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type, detailId } = e.target.dataset;
    if (type === "search") {
      const $inputVal = this.$element.querySelector(".search-input");
      searchHandler($inputVal.value);
    } else if (type === "append") {
      modalHandler(this.state.categoryLists);
    } else if (type === "detail") {
      appendDetailMoveHandler(
        detailId,
        this.state.productLists,
        "ProductDetails",
      );
    }
  });

  function modalHandler(categoryLists = []) {
    let imageBase64 = "";

    $modalLayout.innerHTML = productModal(categoryLists ?? []);
    document.querySelector("body").prepend($modalLayout);

    const $modalClose = $modalLayout.querySelector(".close-button");
    const $appendButton = $modalLayout.querySelector(".append-button");
    const $file = returnDocumentId("file");
    $file.addEventListener("input", function (e) {
      let reader = new FileReader();

      reader.readAsDataURL($file.files[0]);

      reader.onload = function () {
        imageBase64 = reader.result;
        const $imageContaier = returnDocumentClass("image-container");
        $imageContaier.innerHTML = `<img width="478px" height="478px" src=${imageBase64} alt="image" />
        `;
      };

      reader.onerror = function (error) {
        alert("Error: ", error);
        document.querySelector("body").removeChild(modalEl);
      };
    });

    $appendButton.addEventListener("click", () => {
      const productName = returnDocumentId("productName");
      const category = returnDocumentId("category");
      const companyName = returnDocumentId("companyName");
      const description = returnDocumentId("description");
      const stock = returnDocumentId("stock");
      const price = returnDocumentId("price");

      const data = {
        id: String(Date.now()),
        productName: productName.value,
        category: category.value,
        companyName: companyName.value,
        description: description.value,
        stock: stock.value,
        price: price.value,
        imageSrc: imageBase64,
      };
      appendHandler(data);
      closeModal();
    });

    $modalClose.addEventListener("click", closeModal);
  }

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);

    this.$element.innerHTML = categoryHeader();

    this.$element.insertAdjacentHTML(
      "beforeend",
      tableTemplate(PRODUCT_COLUMNS, this.state.productLists),
    );

    $app.appendChild(this.$element);
    this.render();
  };

  this.render = () => {
    const $table = this.$element.querySelector("table");
    if ($table) {
      $table.innerHTML = tableTemplate(
        PRODUCT_COLUMNS,
        this.state.productLists,
      );
    }
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
