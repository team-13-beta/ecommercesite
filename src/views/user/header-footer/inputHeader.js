import * as Api from "../../api.js";

import headerComponent from "./header.js";

const bodyEl = document.querySelector("body");

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

function inputHeader() {
  const isLogin = sessionStorage.getItem("token") ? true : false;
  const isLoginBySession = getCookie('connect.sid');

  if (isLogin || isLoginBySession) {
    const headerStr = headerComponent("LOGOUT", "MYPAGE", "ADMIN");
    const headerEl = document.createElement("div");
    headerEl.innerHTML = headerStr;

    bodyEl.prepend(headerEl);
    const logout = document.querySelector(".LOGOUT");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      fetch("http://localhost:5000/api/logout").then(()=>deleteCookie('connect.sid')
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");
      window.location.href = "/";
      deleteCookie("connect.sid");
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

  if (!(isLogin || isLoginBySession)) {
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

function getCookie(key) {
  var result = null;
  var cookie = document.cookie.split(';');
  cookie.some(function (item) {
      // 공백을 제거
      item = item.replace(' ', '');

      var dic = item.split('=');

      if (key === dic[0]) {
          result = dic[1];
          return true;    // break;
      }
  });
  return result;
}


//쿠키값 조회

function deleteCookie(key) {
	document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
