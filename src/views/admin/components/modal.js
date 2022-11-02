export const categoryModal = `
              <div class="modal__category__card">
                <div class="modal__header">
                  <h2>카테고리 추가하기</h2>
                  <button class="close-button">닫기</button>
                  </div>
                  <div class="modal__main">
                    <input class="category-input" placeholder="카테고리 이름" />
                    <button class="category-append">추가하기</button>
                  </div>
              </div>
              `;
export const productModal = (categories) => {
  return `
    <div class="modal__product__card">
    <div class="modal__header">
      <h2>상품을 추가해주세요</h2>
      <button class="close-button">닫기</button>
      </div>
      <submit class="modal__main">
        <select>
          ${categories
            .map(
              ({ category_id, category_name }) =>
                `<option value={${category_id}}>${category_name}</option>`,
            )
            .join("")}
        </select>
        <button type="submit" class="product-append">추가하기</button>
      </submit>
    </div>
  `;
};
export function closeModal() {
  document
    .querySelector("body")
    .removeChild(document.querySelector("body").firstChild);
}
