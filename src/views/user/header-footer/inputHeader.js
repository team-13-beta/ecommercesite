import headerComponent from "./header.js";

const bodyEl = document.querySelector("body");

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
function inputHeader() {
  const isLogin = sessionStorage.getItem("token") ? true : false;

  if (isLogin) {
    const headerStr = headerComponent("LOGOUT", "MYPAGE");
    const headerEl = document.createElement("div");
    headerEl.innerHTML = headerStr;

    bodyEl.prepend(headerEl);
    const logout = document.querySelector(".LOGOUT");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("token");
      window.location.href = "/";
      deleteCookie("connect.sid");
    });
  }

  if (!isLogin) {
    const headerStr = headerComponent("LOGIN", "REGISTER");
    const headerEl = document.createElement("div");
    headerEl.innerHTML = headerStr;
    bodyEl.prepend(headerEl);

    const loginEl = document.querySelector(".LOGIN");
    loginEl.addEventListener("click", () => {
      window.location.href = "/login";
    });

    const registerEl = document.querySelector(".REGISTER");
    registerEl.addEventListener("click", () => {
      window.location.href = "/register";
    });
  }
}

function handleLogo() {
  const logoEl = document.querySelector("#logo-box");

  logoEl.onmouseover = function () {
    this.style.backgroundColor = "#d9480f";
    this.style.cursor = "pointer";
  };
  logoEl.onmouseout = function () {
    this.style.backgroundColor = "#ff922b";
  };
  logoEl.addEventListener("click", () => {
    console.log("logo click");
    window.location.href = "/";
  });

  const headLoginEl = document.querySelector(".head-login");
  headLoginEl.onmouseover = function () {
    this.style.color = "#d9480f";
    this.style.cursor = "pointer";
  };
  headLoginEl.onmouseout = function () {
    this.style.color = "#ff922b";
  };

  const headRegEl = document.querySelector(".head-register");
  headRegEl.onmouseover = function () {
    this.style.color = "#d9480f";
    this.style.cursor = "pointer";
  };
  headRegEl.onmouseout = function () {
    this.style.color = "#ff922b";
  };

  const headCartEl = document.querySelector(".head-cart");
  headCartEl.onmouseover = function () {
    this.style.color = "#d9480f";
    this.style.cursor = "pointer";
  };
  headCartEl.onmouseout = function () {
    this.style.color = "#ff922b";
  };
  headCartEl.addEventListener("click", () => {
    window.location.href = "/user/bucket";
  });
}

inputHeader();
handleLogo();
