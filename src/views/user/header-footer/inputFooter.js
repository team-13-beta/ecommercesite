import footerComponent from "./footer.js";

const bodyEl = document.querySelector("body");
function inputFooter() {
  const footerStr = footerComponent();
  const footerEl = document.createElement("div");
  footerEl.innerHTML = footerStr;
  bodyEl.append(footerEl);
}

inputFooter();
