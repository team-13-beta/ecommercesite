import * as Api from "../../api.js";

// 요소

const container = document.querySelector(".tbody");

//버튼
const deleteButton = document.querySelector(".deletebutton");

//일단 데이터베이스 데이터 가져오기
const getOrderList = async () => {
  const user = await Api.get("/api/userlist");
  console.log(user._id);
  const datas = await Api.get("/orders");
  console.log(datas);
  const result = datas
    .map(
      (data, i) => `
<tr id="${data.orderId}">
<td>${datas.createdTime}</td>
<td>${datas.productId}</td>
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
  const id = target.parentNode.parentNode.id; //tr의 id를 가져와줌
  console.log(id);
  if (target.tagName === "BUTTON") {
    deleteOrder(id);
  }
}

// 주문 취소 버튼 눌러서 삭제 confirm 나오게 해서 삭제!
const deleteOrder = async (id) => {
  const deleteConfirm = confirm("취소 하시겠습니까?");
  if (deleteConfirm) {
    try {
      await Api.delete(`/orders/user/${id}`);
      alert("삭제되었습니다");
      window.location.href = "/userorder";
    } catch (err) {
      alert(err);
    }
  }
};
