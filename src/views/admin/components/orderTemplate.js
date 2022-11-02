export function orderHeaderTemplate() {
  return `
      <div>
        <input class="order-search"/>
        <button class="search" >검색하기</button>
      </div>
      `;
}

export function orderDetailTemplate(data) {
  const deliveryState = ["배송전", "배송중", "배송완료"];
  return `
      <button class='update_button' data-type="update">수정 완료</button>
      <button class='delete_button' data-type="delete">삭제하기</button>
      <div>
        <p>회원 정보</p>
        <labe>이름: </labe>
        <input value=${data.consumerName} readOnly />
        <label>전화 번호: </label>
        <input value="${data.phoneNumber}" readOnly />
      </div>
      <div>
        <p>배송 정보</p>
        <label>배송지 정보: </label>
        <input value="${data.address}" readOnly />
        <label>배송 상태</label>
        <select>
          ${deliveryState
            .map((state) => {
              if (state === data.status) {
                return `<option selected>${state}</option>`;
              } else return `<option >${state}</option>`;
            })
            .join("")}
        </select>
      </div>
      <div>
        <p>상품 정보</p>
      </div>
    `;
}
