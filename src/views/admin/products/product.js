import {
  clearContainer,
  createElement,
  returnDocumentId,
} from "../../utility/documentSelect.js";
import { appendDetailMoveHandler } from "../../utility/navigate.js";
import { productHeader } from "../components/product/productHeader.js";
import { tableTemplate } from "../components/tableTemplate.js";
import { productModal, closeModal } from "../components/modal.js";
import { checkStringEmpty, fileAppendImage } from "../../useful-functions.js";
import { addImageToS3 } from "../../aws-s3.js";

const PRODUCT_COLUMNS = [
  ["id", "상품 아이디"],
  ["name", "상품명"],
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
    switch (type) {
      case "search":
        const $inputVal = this.$element.querySelector(".search-input");
        searchHandler($inputVal.value);
        break;
      case "append":
        modalHandler(this.state.categoryLists);
        break;
      case "detail":
        appendDetailMoveHandler(
          detailId,
          this.state.productLists,
          "ProductDetails",
        );
        break;
      default:
        return;
    }
  });

  function modalHandler(categoryLists = []) {
    let nutritionImage = "";
    let deliveryImage = "";
    let detailImage = "";
    let titleImage = "";

    const $modalLayout = createElement("div");
    $modalLayout.setAttribute("class", "modal is-active");

    $modalLayout.innerHTML = productModal(categoryLists ?? []);
    document.querySelector("body").prepend($modalLayout);

    const $modalClose = $modalLayout.querySelector(".close-button");
    const $appendButton = $modalLayout.querySelector(".append-button");
    const $fileField = $modalLayout.querySelector(".file-field");

    $fileField.addEventListener("input", (e) => {
      e.preventDefault();
      const { type } = e.target.dataset;
      const $figure = $fileField.querySelector(`.${type}-image`);

      switch (type) {
        case "title":
          titleImage = e.target;
          fileAppendImage(titleImage, $figure);
          break;
        case "detail":
          detailImage = e.target;
          fileAppendImage(detailImage, $figure);
          break;
        case "delivery":
          deliveryImage = e.target;
          fileAppendImage(deliveryImage, $figure);
          break;
        case "nutrition":
          nutritionImage = e.target;
          fileAppendImage(nutritionImage, $figure);
          break;
      }
    });

    $appendButton.addEventListener("click", async () => {
      const name = returnDocumentId("productName").value;
      const categoryId = returnDocumentId("categoryId").value;
      const companyName = returnDocumentId("companyName").value;
      const summary = returnDocumentId("summary").value;
      const stock = returnDocumentId("stock").value;
      const price = returnDocumentId("price").value;
      const isValidate = [
        name,
        categoryId,
        summary,
        companyName,
        stock,
        price,
      ].every((value) => !checkStringEmpty(value));

      if (!isValidate) {
        alert("입력된 값을 확인해주세요");
        return;
      }
      try {
        const [titleKey, detailKey, deliveryKey, nutritionKey] =
          await Promise.all([
            addImageToS3(titleImage, categoryId),
            addImageToS3(detailImage, categoryId),
            addImageToS3(deliveryImage, categoryId),
            addImageToS3(nutritionImage, categoryId),
          ]);

        const data = {
          name,
          categoryId: +categoryId,
          company: companyName,
          titleImage: titleKey,
          detailImage: detailKey,
          deliveryImage: deliveryKey,
          nutritionImage: nutritionKey,
          summary,
          stock,
          price,
        };
        await appendHandler({ ...data });
        closeModal();
      } catch (err) {
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`,
        );
      }
    });

    $modalClose.addEventListener("click", closeModal);
  }

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);

    this.$element.innerHTML = productHeader();

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
