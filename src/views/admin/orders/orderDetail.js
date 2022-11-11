import { getImageUrl } from "../../aws-s3.js";
import { checkObjectEmpty } from "../../useful-functions.js";
import { clearContainer, createElement } from "../../utility/documentSelect.js";
import { navigate } from "../../utility/navigate.js";
import { orderDetailTemplate } from "../components/order/orderTemplate.js";

export default function OrderDetail({
  $app,
  initialState,
  deleteHandler,
  updateHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div");
  this.$element.className = "container";
  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type } = e.target.dataset;
    switch (type) {
      case "update":
        updateHandler({
          ...this.state,
          status: this.$element.querySelector("select").value,
        });
        break;
      case "delete":
        if (confirm("정말 삭제하시겠습니까?")) deleteHandler(this.state.id);
        break;
      default:
        return;
    }
  });

  const getTitleImage = async (array = []) => {
    const image = await Promise.all(
      array.map(async (data) => ({
        productId: data.productId,
        img: await getImageUrl(data.img),
      })),
    );
    return image;
  };

  this.init = async () => {
    clearContainer($app);
    if (!this.state || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    } else {
      const imageUrls = await getTitleImage(this.state.buyingProduct);

      this.$element.innerHTML = orderDetailTemplate(this.state, imageUrls);
    }

    $app.appendChild(this.$element);
  };

  this.render = async () => {
    if (checkObjectEmpty(this.state)) return;

    const imageUrls = await getTitleImage(this.state.buyingProduct);
    this.$element.innerHTML = orderDetailTemplate(this.state, imageUrls);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}
