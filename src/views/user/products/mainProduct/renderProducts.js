export default function renderProducts(img, name, price) {
  return `
      <div class="card product-item">
        <div class="card-image is-128x128">
        <img src=${img} alt="대표 이미지"/>
        </div>
        <div class="card-content title">${name}</div>
        <div class="card-content">${price}</div>
      </div>
      `;
}
