import * as Api from "../../api.js";

// 요소

const container = document.querySelector(".tbody");

//버튼
const deleteButton = document.querySelector(".deletebutton");

// orderdata
const orderData = {
  data: [
    {
      id: "1",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "2",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "3",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "4",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "5",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "6",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "7",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "8",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "9",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "asdf",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "10",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "한정환",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
  ],
};

//일단 데이터베이스 데이터 가져오기
const getOrderList = async () => {
  const data = orderData.data;
  const dataid = data;
  console.log(
    dataid.map((data, id) => {
      console.log(data.id);
    }),
  );

  const result = dataid
    .map(
      (data, i) => `
<tr id="${data.id}">
<td>${i + 1}</td>
<td>${"2011-11-11"}</td>
<td>${data.totalPrice}</td>
<td>${data.status}</td>
<td>
  <button type="button" class="button deleteButton">주문 취소</button>
</td>
</tr>`,
    )
    .join("");
  container.innerHTML = result; //테이블 안에 넣어버리기
};
getOrderList(); //함수 실행으로 보여주기

//이벤트 만들기 ~
container.addEventListener("click", deleteButton1);
//누른 곳이 버튼이면 deleteOrder함수 소환
function deleteButton1(e) {
  const target = e.target;
  const id = target;
  console.log(id);
  if (target.tagName === "BUTTON") {
    deleteOrder(id);
  }
}
// 주문 취소 버튼 눌러서 삭제 confirm 나오게 해서 삭제!
const deleteOrder = async (id) => {
  const deleteconfirm = confirm("취소 하시겠습니까?");
  if (deleteconfirm) {
    try {
      //  delete api를 넣으면 될려나 ?
      alert("취소되었습니다");
      window.location.href = "/userorder";
    } catch (err) {
      alert(err);
    }
  }
};
