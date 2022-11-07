export default function renderDetailData(id, img, name, price, des) {
  return `
    <div class="image column img-title">
        <img src=${img} alt="대표 이미지" id="item-img"/>
    </div>
    <div class="column card">
      <div style="display:none;" id="item-id">${id}</div>
      <div class="card-title item-title">${name}</div>
      <div class="card-content item-des">${des}</div>
      <div class="card-content item-price">${price}</div>
      <div class="card-content columns">
        <div class="column is-one-third">제품 옵션</div>
        <div class="column">
          <div class="select is-medium">
            <select id="select-value">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-content columns">
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
