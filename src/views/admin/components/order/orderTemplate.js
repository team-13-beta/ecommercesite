export function orderHeaderTemplate() {
  return `
      <div>
        <input class="search-input input"/>
        <button class="search button" data-type="search" >검색하기</button>
      </div>
      `;
}

export function orderDetailTemplate(data) {
  const deliveryState = ["배송전", "배송중", "배송완료"];
  if (!data) return `<div>데이터가 없습니다.</div>`;
  return `
      <div class = "content">
        <button class='button' data-type="update">수정 완료</button>
        <button class='button' data-type="delete">삭제하기</button>
      </div>
      <div class = "content">
        <p class="subtitle">회원 정보</p>
        <div class = "detail-div">
            <div>
              <label for="name">이름 </label>
              <input id="name" class="input info-input" value=${
                data.consumerName
              } readOnly />
              </div>
            <div>
              <label for="phoneNumber">전화 번호 </label>
              <input id="phoneNumber" class="input info-input" value="${
                data.phoneNumber
              }" readOnly />
            </div>
        </div>
      </div>
      <div class = "content">
        <p class="subtitle">배송 정보</p>
        <div class = "detail-div">
          <div>
            <label for="address">배송지 정보 </label>
            <input id="address" class="input info-input" value="${
              data.address
            }" readOnly />
          </div>
          <div>
            <label>배송 상태</label>
            <div class="select">
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
            </div>
          </div>
      </div>
      <div class = "content">
        <p class="subtitle">상품 정보</p>
      </div>
    `;
}
