import * as Api from "../../api.js";
import {
  checkPhoneNumberValid,
} from "../../useful-functions.js";

// 요소(element), input 혹은 상수
const postalCodeInput = document.querySelector("#postalCode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const phoneNumberInput = document.querySelector("#phoneNumberInput");

//버튼들
const searchAddressButton = document.querySelector("#searchAddressButton");
const submitButton = document.querySelector("#submitButton");
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  searchAddressButton.addEventListener("click", searchAddress);
  submitButton.addEventListener("click", handleSubmit);
}
// daum post api 불러오기.

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
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}
// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const phoneNumber = phoneNumberInput.value;

  //객체 형태로 주소 데이터 보내기.
  const address = { postalCode, address1, address2 };

  // 잘 입력했는지 확인

  const isPhoneNumberValid = checkPhoneNumberValid(phoneNumber);

  if (!isPhoneNumberValid) {
    return alert(
      "잘못된 양식의 휴대폰 번호입니다. 010-- 양식으로 입력해주세요.",
    );
  }

  // 회원가입 api 요청
  try {
    const data = {address, phoneNumber };

    await Api.post("/api/registerOauth", data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 홈페이지 이동
    window.location.href = "/";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}