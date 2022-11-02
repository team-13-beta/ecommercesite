export default function renderData(img, name, price, des) {
  return `
    <div class="image  column img-title">
        <img src=${img} />
    </div>
    <div class="column card">
      <div class="card-title item-title">${name}</div>
      <div class="card-content item-des">${des}</div>
      <div class="card-content item-price">${price}</div>
      <div class="card-content columns">
        <div class="column is-one-third">제품 옵션</div>
        <div class="column">
          <div class="select is-medium">
            <select>
              <option>10팩</option>
              <option>20팩</option>
              <option>20팩</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-content columns">
        <button class="button is-medium is-responsive column">
          장바구니
        </button>
        <button class="button is-medium is-responsive column">
          바로구매
        </button>
      </div>
    </div>
    `;
}
