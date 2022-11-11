import { addImageToS3, deletePhoto } from "./aws-s3.js";

// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
  return parseInt(string.replace(/(,|개|원)/g, ""));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

// path가 올바른 형식인지 확인
export const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const checkStringEmpty = (string) => (string === "" ? true : false);

// 핸드폰 번호 체크
export const checkPhoneNumberValid = (phoneNumber) => {
  const input = phoneNumber;
  if (input[3] == "-" && input[8] == "-") {
    return true;
  }
  return false;
};

export const checkObjectEmpty = (object) => {
  return JSON.stringify(object) === "{}";
};

export const fileAppendImage = (file, figure) => {
  let reader = new FileReader();

  reader.readAsDataURL(file.files[0]);

  reader.onload = function () {
    const imageBase64 = reader.result;
    figure.setAttribute("class", "image is-square");
    figure.innerHTML = `<img id="product-image" src=${imageBase64} alt="상품 이미지" />`;
  };

  reader.onerror = function (error) {
    alert("Error: ", error);
  };
};

export const fileUpdateImage = (file, img) => {
  let reader = new FileReader();

  reader.readAsDataURL(file.files[0]);

  reader.onload = function () {
    const imageBase64 = reader.result;
    img.src = imageBase64;
  };

  reader.onerror = function (error) {
    alert("Error: ", error);
  };
};

export const getImageKeyByCheckType = async (element, categoryId, imageKey) => {
  let result = element;
  if (typeof element === "object") {
    deletePhoto(imageKey);
    result = await addImageToS3(element, categoryId);
  }

  return result;
};

export const checkAdmin = async () => {
  // 우선 화면을 가리고 시작함 -> 화면 번쩍거림으로 인해 일단 미적용
  //window.document.body.style.display = 'none';

  const token = sessionStorage.getItem("token");
  // 우선 토큰 존재 여부 확인
  if (!token) {
    // 현재 페이지의 url 주소 추출하기
    const pathname = window.location.pathname;
    const search = window.location.search;

    // 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
    window.location.replace(`/login?previouspage=${pathname + search}`);
  }
  // 관리자 토큰 여부 확인
  const res = await fetch("/api/admin/check", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await res.json();

  if (result === "success") {
    window.document.body.style.display = "block";

    return;
  } else {
    alert("관리자 전용 페이지입니다.");

    window.location.replace("/");
  }
};

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
