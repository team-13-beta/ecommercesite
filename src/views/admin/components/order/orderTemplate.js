import { addCommas, checkObjectEmpty } from "../../../useful-functions.js";

export function orderHeaderTemplate() {
  return `
      <div>
        <input class="search-input input" placeholder="주문자 이름을 검색해주세요."/>
        <button class="search button" data-type="search" >검색하기</button>
      </div>
      `;
}

export function orderDetailTemplate(data, imageUrls = []) {
  const deliveryState = ["배송 전", "배송 중", "배송 완료", "주문 취소"];
  if (!data || checkObjectEmpty(data)) return `<div>데이터가 없습니다.</div>`;
  return `
      <div class = "content">
        <button class='button' data-type="update">수정 완료</button>
        <button class='button' data-type="delete">삭제하기</button>
      </div>
      <div class = "content">
        <p class="subtitle divideTitle">회원 정보</p>
        <div class = "detail-div">
            <div>
              <label for="name">이름 </label>
              <input id="name" class="input info-input" value=${
                data.userName
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
        <p class="subtitle divideTitle">배송 정보</p>
        <div class = "detail-div">
          <div>
            <label for="address">배송지 정보 </label>
            <input id="address" class="input info-input" value="${`${data.address.address1} ${data.address.address2}`}" readOnly />
          </div>
          <div>
            <label>배송 상태</label>
            <div class="select">
              <select>
              ${deliveryState.reduce(
                (acc, cur) =>
                  (acc += `<option 
                  ${cur === data.status ? "selected" : ""}
                  }>${cur}</option>`),
                "",
              )}
                </select>
              </div>
            </div>
          </div>
      </div>
      ${
        data.buyingProduct.length > 0
          ? `<div class = "content">        
          <p class="subtitle divideTitle">상품 정보</p>
          ${data.buyingProduct.reduce((acc, cur) => {
            const { img } = imageUrls.find(
              (data) => data.productId == cur.productId,
            );
            return (acc += `<div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img src=${img} alt="상품 이미지"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">${cur.name}</p>
                  <p class="subtitle is-6">
                    <span class="sub-span">가격: </span>
                    ${addCommas(cur.price)}원
                  </p>

                  <p class="subtitle is-6">
                    <span class="sub-span">수량: </span>
                    ${addCommas(cur.stock)}개
                  </p>

                  <p class="subtitle is-6">
                    <span class="sub-span">총 가격: </span> 
                    ${addCommas(cur.price * cur.stock)}원
                  </p>
                </div>
              </div>`);
          }, ``)}
        </div>`
          : null
      }
      
    `;
}
