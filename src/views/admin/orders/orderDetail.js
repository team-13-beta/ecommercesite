import { clearContainer, createElement } from "../../utility/documentSelect.js";

export default function OrderDetail({ $app, initialState }) {
  this.state = initialState;

  this.$element = createElement("div");
  this.init = () => {
    clearContainer($app);
    this.render();
  };
  this.render = () => {};
}
