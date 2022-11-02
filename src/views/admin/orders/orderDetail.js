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

  this.init = () => {
    clearContainer($app);
    if (this.state === undefined || this.state.id !== history.state.state.id) {
      this.setState(history.state.state);
    }
    const detailTemplate = orderDetailTemplate(this.state);
    this.$element.innerHTML = detailTemplate;

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
    console.log("orderDetail render");
    $app.appendChild(this.$element);
  };

  this.render = () => {
    this.$element.innerHTML = orderDetailTemplate(this.state);
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };
}
