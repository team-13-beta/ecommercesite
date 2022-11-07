import {
  clearContainer,
  createElement,
  returnDocumentClass,
  returnDocumentId,
} from "../../utility/documentSelect.js";
import { productDetailTemplate } from "../components/product/productTemplate.js";

export default function ProductDetail({
  $app,
  initialState,
  $categories,
  deleteHandler,
  updateHandler,
}) {
  this.state = initialState;
  this.$categories = $categories;

  this.$element = createElement("div");

  // this.$element.addEventListener("click", (e) => {});

  const subScribeEventListener = () => {
    const $modifyContainer = document.querySelector(".modify-container");
    const $file = document.getElementById("file");
    if (!$modifyContainer || !$file) return;
    $modifyContainer.addEventListener("click", (e) => {
      e.preventDefault();
      const { type } = e.target.dataset;

      if (type === "update") {
        updateHandler({ ...this.state });
      } else if (type === "delete") {
        if (confirm("정말 삭제하시겠습니까?")) deleteHandler(this.state.id);
      }
    });

    $file.addEventListener("input", (e) => {
      let reader = new FileReader();

      reader.readAsDataURL($file.files[0]);

      reader.onload = () => {
        const imageBase64 = reader.result;
        console.log(imageBase64, "@@");
        this.setState({ ...this.state, imageSrc: imageBase64 });
      };

      reader.onerror = function (error) {
        alert("Error: ", error);
        document.querySelector("body").removeChild(modalEl);
      };
    });
  };

  this.$element.addEventListener("change", (e) => {
    e.preventDefault();
    const {
      dataset: { type },
      value,
    } = e.target;
    this.setState({ ...this.state, [`${type}`]: value });
  });

  this.init = () => {
    clearContainer($app);
    clearContainer(this.$element);
    if (!this.state || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    }

    this.$element.innerHTML = productDetailTemplate(
      this.state ?? null,
      this.$categories,
    );

    $app.appendChild(this.$element);
    subScribeEventListener();
  };

  this.render = () => {
    if (!this.state || JSON.stringify(this.state) === "{}") return;
    this.$element.innerHTML = productDetailTemplate(
      this.state ?? null,
      this.$categories,
    );
    console.log(this.$element.innerHTML);
    subScribeEventListener();
  };

  this.setState = (nextState, categories) => {
    this.state = nextState;
    this.$categories = categories ?? this.$categories;
    this.render();
  };
}
