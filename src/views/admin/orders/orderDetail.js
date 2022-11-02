import { clearContainer, createElement } from "../../utility/documentSelect.js";
import { orderDetailTemplate } from "../components/orderTemplate.js";

export default function OrderDetail({
  $app,
  initialState,
  deleteHandler,
  updateHandler,
}) {
  this.state = initialState;

  this.$element = createElement("div");
  this.$element.addEventListener("click", (e) => {
    e.preventDefault();
    const { type } = e.target.dataset;
    if (type === "update") {
      updateHandler({
        ...this.state,
        status: this.$element.querySelector("select").value,
      });
    } else if (type === "delete") {
      deleteHandler(e);
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
