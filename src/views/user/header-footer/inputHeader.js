import * as Api from "../../api.js";

import headerComponent from "./header.js";

const bodyEl = document.querySelector("body");
function inputHeader() {
  const isLogin = sessionStorage.getItem("token") ? true : false;
  const isLoginBySession = getCookie('connect.sid');

  console.log(isLoginBySession);

  if (isLogin || isLoginBySession) {
    const headerStr = headerComponent("logout", "mypage");
    const headerEl = document.createElement("div");
    headerEl.innerHTML = headerStr;

    bodyEl.prepend(headerEl);
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async (e) => {
      e.preventDefault();
      fetch("http://localhost:5000/api/logout").then(()=>deleteCookie('connect.sid')
      );
      sessionStorage.removeItem("token");
      window.location.href = "/";
    });
  }

  if (!(isLogin || isLoginBySession)) {
    const headerStr = headerComponent("login", "register");
    const headerEl = document.createElement("div");

    headerEl.innerHTML = headerStr;

    bodyEl.prepend(headerEl);
  }
}


inputHeader();

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


