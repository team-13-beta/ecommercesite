export default function renderBucketData(id, img, name, price, stock) {
  return `
          <input type="checkbox" class="checkbox" checked=true>
          <div class="column">
            <img src="${img}" title="" />
          </div>
          <div style="display:none;" id="item-id">${id}</div>
          <div class="column ">${name}</div>
          <div class="column price-value">
          ${(price * 1).toLocaleString("ko-KR")}
          <span>원</span></div>
          <div class="stock-con bu-item-center column" style="gap:8px;">
            <button class="button minus-btn" style="padding:0; width:1.5rem; height:1.5rem;">-</button>
            <div class="stock-value">${stock}</div>
            <button class="button plus-btn" style="padding:0; width:1.5rem; height:1.5rem;">+</button>
          </div>
          <div class="column item-total-price">
          ${(price * stock).toLocaleString("ko-KR")}<span>원</span></div>
          <button class="delete  column del-btn"></button>    
  `;
}
