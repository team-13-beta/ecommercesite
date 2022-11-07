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
import { checkStringEmpty } from "../../useful-functions.js";

const PRODUCT_COLUMNS = [
  ["id", "상품 아이디"],
  ["productName", "상품명"],
  ["categoryId", "카테고리"],
  ["price", "가격"],
  ["stock", "남은 개수"],
  ["detailButton", "상세정보 가기"],
];

export default function Products({
  $app,
  initialState,
  searchHandler,
  appendHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div");

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
    const $modalLayout = createElement("div");
    $modalLayout.setAttribute("class", "modal is-active");
    let imageBase64 = "";

    $modalLayout.innerHTML = productModal(categoryLists ?? []);
    document.querySelector("body").prepend($modalLayout);

    const $modalClose = $modalLayout.querySelector(".close-button");
    const $appendButton = $modalLayout.querySelector(".append-button");
    const $file = returnDocumentId("file");

    $file.addEventListener("input", function (e) {
      e.preventDefault();
      let reader = new FileReader();

      reader.readAsDataURL($file.files[0]);

      reader.onload = function () {
        imageBase64 = reader.result;
        const $imageFigure = $modalLayout.querySelector("figure");
        $imageFigure.setAttribute("class", "image is-square");
        $imageFigure.innerHTML = `<img id="product-image" src=${imageBase64} alt="상품 이미지" />`;
      };

      reader.onerror = function (error) {
        alert("Error: ", error);
        document.querySelector("body").removeChild(modalEl);
      };
    });

    $appendButton.addEventListener("click", () => {
      const productName = returnDocumentId("productName").value;
      const categoryId = returnDocumentId("categoryId").value;
      const companyName = returnDocumentId("companyName").value;
      const description = returnDocumentId("description").value;
      const stock = returnDocumentId("stock").value;
      const price = returnDocumentId("price").value;
      const isValidate = [
        productName,
        categoryId,
        companyName,
        description,
        stock,
        price,
      ].every((value) => !checkStringEmpty(value));

      if (!isValidate) {
        alert("입력된 값을 확인해주세요");
        return;
      }
      const data = {
        id: String(Date.now()),
        productName,
        categoryId,
        companyName,
        description,
        stock,
        price,
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
      tableTemplate(
        PRODUCT_COLUMNS,
        this.state.productLists,
        this.state.categoryLists,
      ),
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
        this.state.categoryLists,
      );
    }
  };

  this.setState = (state) => {
    this.state = state;
    this.render();
  };
}
