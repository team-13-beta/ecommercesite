import headerComponent from "./header.js";
import footerComponent from "./footer.js";

const bodyEl = document.querySelector("body");
function inputComponent() {
  const headerStr = headerComponent();
  const footerStr = footerComponent();

  const headerEl = document.createElement("div");
  const footerEl = document.createElement("div");
  headerEl.innerHTML = headerStr;
  footerEl.innerHTML = footerStr;
  bodyEl.prepend(headerEl);
  bodyEl.append(footerEl);
}

inputComponent();
