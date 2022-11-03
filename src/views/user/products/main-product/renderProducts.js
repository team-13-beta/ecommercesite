export default function renderProducts(img, name, price) {
  return `
      <div class="card">
        <div class="card-image is-128x128">
        <img src=${img}/>
        </div>
        <div class="card-content title">${name}</div>
        <div class="card-content">${price}</div>
      </div>
      `;
}
