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
  const $file = createElement("input");
  $file.type = "file";
  $file.name = "file";
  $file.addEventListener("input", (e) => {
    let reader = new FileReader();

    reader.readAsDataURL($file.files[0]);

    reader.onload = () => {
      const imageBase64 = reader.result;
      this.setState({ ...this.state, imageSrc: imageBase64 });
    };

    reader.onerror = function (error) {
      alert("Error: ", error);
      document.querySelector("body").removeChild(modalEl);
    };
  });

  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type } = e.target.dataset;
    if (type === "update") {
      updateHandler({ ...this.state });
    } else if (type === "delete") {
      if (confirm("정말 삭제하시겠습니까?")) deleteHandler(this.state.id);
    }
  });

  this.$element.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(e);
    const {
      dataset: { type },
      value,
    } = e.target;
    this.setState({ ...this.state, [`${type}`]: value });
    // 뭔가 유동적으로 변하게 하고 싶은데, 그게 잘 안되네...
  });

  this.init = () => {
    clearContainer($app);
    if (!this.state || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    }
    this.$element.innerHTML = productDetailTemplate(
      this.state,
      this.$categories,
    );

    $app.appendChild(this.$element);
    $app.appendChild($file);
  };

  this.render = () => {
    this.$element.innerHTML = productDetailTemplate(
      this.state,
      this.$categories,
    );
  };

  this.setState = (nextState, categories) => {
    this.state = nextState;
    this.$categories = categories ?? this.$categories;
    this.render();
  };
}
