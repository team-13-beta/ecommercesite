import { checkObjectEmpty } from "../../../useful-functions.js";

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
  if (!data || checkObjectEmpty(data)) return `<div>데이터가 없습니다.</div>`;
  console.log(data);
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
              data.address.address1 + data.address.address2
            }" readOnly />
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
          <p class="subtitle">상품 정보</p>
          ${data.buyingProduct.reduce((acc, cur) => {
            return (acc += `<div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src=${cur.img} alt="상품 이미지"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">${cur.name}</p>

                  <p class="subtitle is-6">
                    <span class="sub-span">수량: </span>
                    ${cur.stock}
                  </p>

                  <p class="subtitle is-6">
                    <span class="sub-span">총 가격: </span>
                    <span class="small-span">${cur.price} x ${cur.stock}</span> 
                    ${cur.price * cur.stock}
                  </p>
                </div>
              </div>`);
          }, ``)}
        </div>`
          : null
      }
      
    `;
}
