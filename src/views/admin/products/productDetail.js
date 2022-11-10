import { checkStringEmpty, fileUpdateImage } from "../../useful-functions.js";
import { clearContainer, createElement } from "../../utility/documentSelect.js";
import { productDetailTemplate } from "../components/product/productTemplate.js";
import { getImageUrl } from "../../aws-s3.js";

export default function ProductDetail({
  $app,
  initialState,
  $categories,
  deleteHandler,
  updateHandler,
}) {
  this.state = initialState;
  this.$categories = $categories;

  this.preImageKey = {
    titleImage: "",
    detailImage: "",
    deliveryImage: "",
    nutritionImage: "",
  }; // 이미지의 과거 imageKey를 저장한 path

  this.$element = createElement("div");
  let titleImage = "";
  let detailImage = "";
  let deliveryImage = "";
  let nutritionImage = "";

  const subScribeEventListener = () => {
    const $modifyContainer = document.querySelector(".modify-container");
    const $fileField = document.querySelector(".file-field");
    if (!$modifyContainer || !$fileField) return;

    $modifyContainer.addEventListener("click", (e) => {
      e.preventDefault();
      const { type } = e.target.dataset;
      switch (type) {
        case "update":
          const name = this.$element.querySelector("#productName").value;
          const categoryId = this.$element.querySelector("#categoryId").value;
          const companyName = this.$element.querySelector("#companyName").value;
          const summary = this.$element.querySelector("#summary").value;
          const stock = this.$element.querySelector("#stock").value;
          const price = this.$element.querySelector("#price").value;

          updateHandler(
            {
              ...this.state,
              name,
              categoryId: +categoryId,
              companyName,
              stock,
              price,
              summary,
              titleImage: checkStringEmpty(titleImage)
                ? this.state.description.titleImage
                : titleImage,
              detailImage: checkStringEmpty(detailImage)
                ? this.state.description.detailImage
                : detailImage,
              deliveryImage: checkStringEmpty(deliveryImage)
                ? this.state.description.deliveryImage
                : deliveryImage,
              nutritionImage: checkStringEmpty(nutritionImage)
                ? this.state.description.nutritionImage
                : nutritionImage,
            },
            this.preImageKey,
          );
          titleImage = "";
          detailImage = "";
          deliveryImage = "";
          nutritionImage = "";
          break;
        case "delete":
          if (confirm("정말 삭제하시겠습니까?"))
            deleteHandler(this.state.id, this.preImageKey);
          break;
        default:
          return;
      }
    });

    $fileField.addEventListener("input", (e) => {});
  };

  this.$element.addEventListener("change", (e) => {
    e.preventDefault();
    const {
      dataset: { type },
    } = e.target;
    const $image = this.$element.querySelector(`#${type}-image`);

    switch (type) {
      case "title":
        titleImage = e.target; // 또한 여기서 값이 dataKey로 변경되어야 함.
        fileUpdateImage(e.target, $image); // 해당 이미지로 변경하는데, 이게 템플릿이 그려지면서 값이 애매해짐.
        break;
      case "detail":
        detailImage = e.target;
        fileUpdateImage(e.target, $image);
        break;
      case "delivery":
        deliveryImage = e.target;
        fileUpdateImage(e.target, $image);
        break;
      case "nutrition":
        nutritionImage = e.target;
        fileUpdateImage(e.target, $image);
        break;
      default:
        // this.setState({ ...this.state, [`${type}`]: value });
        return;
    }
  });

  const getImageUrls = async () => {
    const [titleImage, detailImage, deliveryImage, nutritionImage] =
      await Promise.all([
        getImageUrl(this.state.description.titleImage),
        getImageUrl(this.state.description.detailImage),
        getImageUrl(this.state.description.deliveryImage),
        getImageUrl(this.state.description.nutritionImage),
      ]);
    return { titleImage, detailImage, deliveryImage, nutritionImage };
  };

  this.init = async () => {
    clearContainer($app);
    clearContainer(this.$element);
    if (!this.state || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    }

    const { titleImage, detailImage, deliveryImage, nutritionImage } =
      await getImageUrls();

    this.preImageKey = {
      titleImage: this.state.description.titleImage,
      detailImage: this.state.description.detailImage,
      deliveryImage: this.state.description.deliveryImage,
      nutritionImage: this.state.description.nutritionImage,
    };

    this.$element.innerHTML = productDetailTemplate(
      this.state ?? null,
      this.$categories,
      { titleImage, detailImage, deliveryImage, nutritionImage },
    );

    $app.appendChild(this.$element);
    subScribeEventListener();
  };

  this.render = async () => {
    if (!this.state || JSON.stringify(this.state) === "{}") return;
    const { titleImage, detailImage, deliveryImage, nutritionImage } =
      await getImageUrls();
    this.preImageKey = {
      titleImage: this.state.description.titleImage,
      detailImage: this.state.description.detailImage,
      deliveryImage: this.state.description.deliveryImage,
      nutritionImage: this.state.description.nutritionImage,
    };

    this.$element.innerHTML = productDetailTemplate(
      this.state ?? null,
      this.$categories,
      { titleImage, detailImage, deliveryImage, nutritionImage },
    );
    subScribeEventListener();
  };

  this.setState = (nextState, categories) => {
    this.state = nextState;
    this.$categories = categories ?? this.$categories;
    this.render();
  };
}
