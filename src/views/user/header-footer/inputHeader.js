import headerComponent from "./header.js";

const bodyEl = document.querySelector("body");
function inputHeader() {
  const headerStr = headerComponent();

  const headerEl = document.createElement("div");

  headerEl.innerHTML = headerStr;

  bodyEl.prepend(headerEl);
}
function handleLogo() {
  const logoEl = document.querySelector("#logo-box");

  logoEl.onmouseover = function () {
    this.style.backgroundColor = "#d9480f";
  };
  logoEl.onmouseout = function () {
    this.style.backgroundColor = "#ff922b";
  };
  logoEl.addEventListener("click", () => {
    console.log("logo click");
    window.location.href = "/";
  });
}
inputHeader();
handleLogo();
