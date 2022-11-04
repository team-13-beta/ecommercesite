export default function renderProducts(id, img, name, price) {
  return `
      <div class="card product-item">
      <div style="display:none;">${id}</div>
        <div class="card-image is-128x128">
        <img src=${img} alt="대표 이미지"/>
        </div>
        <div class="card-content title">${name}</div>
        <div class="card-content">${price}</div>
      </div>
      `;
}
