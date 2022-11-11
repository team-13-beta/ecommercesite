import * as Api from "../../api.js";
import { checkPhoneNumberValid } from "../../useful-functions.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const postalCodeInput = document.querySelector("#postalCode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const phoneNumberInput = document.querySelector("#phoneNumberInput");

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {}

getUserInfo();
// //버튼들
const searchAddressButton = document.querySelector("#searchAddressButton");
const saveAccountButton = document.querySelector("#saveAccountButton");
const deleteAccountButton = document.querySelector("#deleteAccountButton");
const cancelButton = document.querySelector("#cancelButton");
// addAllElements();
addAllEvents();

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {}

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  searchAddressButton.addEventListener("click", searchAddress);
  saveAccountButton.addEventListener("click", updateAccount);
  deleteAccountButton.addEventListener("click", deleteAccount);
  cancelButton.addEventListener("click", cancelHandler);
}

//주소 찾기
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

// input에 기존 회원 정보 입력
async function getUserInfo() {
  const user = await Api.get("/api/userlist");
  console.log(user);
  const { name, address, phoneNumber } = user;
  const { postalCode, address1, address2 } = address;

  fullNameInput.value = name;
  phoneNumberInput.value = phoneNumber;
  postalCodeInput.value = postalCode;
  address1Input.value = address1;
  address2Input.value = address2;
}

//계정 업데이트 함수
async function updateAccount(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const phoneNumber = phoneNumberInput.value;
  const address = { postalCode, address1, address2 };

  // 잘 입력했는지 확인 하는 상수
  const isFullNameValid = fullName.length >= 2;
  const isPhoneNumberValid = checkPhoneNumberValid(phoneNumber);

  if (!isFullNameValid) {
    return alert("이름은 2글자 이상 입력해주세요.");
  }

  if (!isPhoneNumberValid) {
    return alert(
      "잘못된 양식의 휴대폰 번호입니다. 010-****-**** 양식으로 입력해주세요.",
    );
  }

  // 유저 정보 수정 api 요청

  try {
    const data = {
      fullName,
      address,
      phoneNumber,
    };

    // await Api.get("/api/userlist");
    fetch("/api/userBySession", data);

    alert(`정상적으로 정보 수정되었습니다.`);

    window.location.href = "";
  } catch (err) {
    // console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//계정 삭제 함수
async function deleteAccount(e) {
  e.preventDefault();
  const user = await Api.get("/api/userlist");

  try {
    await Api.dels("/api/delete", {});
    if (confirm("정말 삭제하시겠습니까?")) {
      alert("회원탈퇴 되었습니다.");
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  } catch (err) {
    alert(err);
  }
}

//수정 취소 함수
function cancelHandler(e) {
  e.preventDefault();
  window.location.href = "/";
}
