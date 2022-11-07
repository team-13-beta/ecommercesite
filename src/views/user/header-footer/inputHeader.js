import headerComponent from "./header.js";

const bodyEl = document.querySelector("body");
function inputHeader() {
  const headerStr = headerComponent();

  const headerEl = document.createElement("div");

  headerEl.innerHTML = headerStr;

  bodyEl.prepend(headerEl);
}

inputHeader();
