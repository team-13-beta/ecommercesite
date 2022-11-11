export default function renderBucketData(name, stock, price) {
  return `
    <div class="columns">
        <div class="column">${name}</div>
        <div class="column">${stock}</div>
        <div class="column">${(stock * price).toLocaleString(
          "ko-KR",
        )}<span>원</span></div>
    </div>
    `;
}
