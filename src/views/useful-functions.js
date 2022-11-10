import { addImageToS3, deletePhoto } from "./aw3-s3.js";

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
  console.log(element);
  if (typeof element === "object") {
    deletePhoto(imageKey);
    result = await addImageToS3(element, categoryId);
  }

  return result;
};
