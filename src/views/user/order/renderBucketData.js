export default function renderBucketData(name, stock) {
  return `
    <div class="columns">
        <div class="card-content">${name}</div>
        <div class="card-content">${stock}</div>
    </div>
    `;
}
