import headerComponent from "./header.js";
import { deleteCookie, getCookie } from "../../useful-functions.js";

const bodyEl = document.querySelector("body");

function inputHeader() {
  const isLogin =
    sessionStorage.getItem("token") || getCookie("connect.sid") ? true : false;
  console.log(isLogin, window.location.pathname);

  if (isLogin) {
    const headerStr = headerComponent("LOGOUT", "MYPAGE", "ADMIN");
    const headerEl = document.createElement("div");
    headerEl.innerHTML = headerStr;

    bodyEl.prepend(headerEl);
    const logout = document.querySelector(".LOGOUT");
    logout.addEventListener("click", async (e) => {
      e.preventDefault();
      const response = await fetch("/api/logout");
      const { result } = await response.json();

      if (result !== "success") alert("로그아웃에 실패했습니다.");
      deleteCookie("connect.sid");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");

      window.location.href = "/";
    });

    const admin = document.querySelector(".ADMIN");
    admin.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/admin";
    });

    const mypageEl = document.querySelector(".MYPAGE");
    mypageEl.addEventListener("click", () => {
      window.location.href = "/mypage";
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

  const adminEl = document.querySelector(".head-admin");
  adminEl.onmouseover = function () {
    this.style.color = "#d9480f";
    this.style.cursor = "pointer";
  };
  adminEl.onmouseout = function () {
    this.style.color = "#ff922b";
  };
}

inputHeader();
handleLogo();
