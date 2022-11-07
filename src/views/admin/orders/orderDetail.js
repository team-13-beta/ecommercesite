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
  this.init = () => {
    clearContainer($app);
    if (!this.state || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    } else {
      this.$element.innerHTML = orderDetailTemplate(this.state);
    }

    $app.appendChild(this.$element);
  };

  this.render = () => {
    this.$element.innerHTML = orderDetailTemplate(this.state);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}
