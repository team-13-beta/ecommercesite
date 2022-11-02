import * as Api from "../../api.js";
import {
  validateEmail,
  // checkPhoneNumberValid,
} from "../../useful-functions.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const CurrentpasswordInput = document.querySelector("#CurrentpasswordInput");
const passwordInput = document.querySelector("#NewpasswordInput");
const passwordConfirmInput = document.querySelector("#NewpasswordConfirmInput");
const postalCodeInput = document.querySelector("#postalCode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const phoneNumberInput = document.querySelector("#phoneNumberInput");

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {}

// //버튼들
const searchAddressButton = document.querySelector("#searchAddressButton");
const saveAccountButton = document.querySelector("#saveAccountButton");
const deleteAccountButton = document.querySelector("#deleteAccountButton");
const cancelButton = document.querySelector("#cancelButton");
// addAllElements();
addAllEvents();
getUsersAccount();
// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {}

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  searchAddressButton.addEventListener("click", searchAddress);
  // saveAccountButton.addEventListener("click", handleSubmit);
  // deleteAccountButton.addEventListener("click", handleSubmit);
  // cancelButton.addEventListener("click", handleSubmit);
}

function searchAddress(e) {
  e.preventDefault();

  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }
      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.value = "";
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}
