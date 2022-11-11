export default function renderDetailData(id, title, t_id, name, price, des) {
  return `
    <div class="image column img-title">
        <img src="${title}" alt="대표 이미지" title="${t_id}" id="item-img"
        style="border-radius: 5px;"
        />
    </div>
    <div class="column card item-info" style="width:480px; height:480px;">
      <div style="display:none;" id="item-id">${id}</div>
      
      <div class="card-content item-name">제품명 : <span>${name}</span></div>
      <div class="card-content item-des">제품 설명 : <span>${des}</span></div>
      <div class="card-content item-price">가격 : <span>${price}</span><span>원</span></div>
      <div class="card-content columns">
        <div class="column is-one-third">제품 수량 선택</div>
        <div class="column">
          <div class="select">
            <select id="select-value">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-content columns" style="gap:16px;">
        <button class="button is-medium column bucket-btn">
          장바구니
        </button>
        <button class="button is-medium column direct-pay">
          바로구매
        </button>
      </div>
    </div>
    `;
}
