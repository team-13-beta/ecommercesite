export const categoryModal = `
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">카테고리 추가하기</p>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <label>카테고리 이름</label>
        <input class="category-input input" placeholder="카테고리 이름" />
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success category-append">추가하기</button>
      <button class="button close-button">취소하기</button>
    </footer>
  </div>
`;

export function productModal(categories) {
  return `<div class="modal__card">
      <div class="modal__header">
        <h2>상품을 추가해주세요</h2>
        <button class="close-button" data-type="close">닫기</button>
      </div>
      <div class="modal__main">
        <label>상품명</label>
        <input id="productName" placeholder="상품명을 입력해주세요"  required/>

        <label>카테고리</label>
        <select id="category" required>
          ${categories
            .map(
              ({ id, category_name }) =>
                `<option value=${category_name}>${category_name}</option>`,
            )
            .join("")}
        </select>

        <label>제조사</label>
        <input id="companyName" placeholder="제조사를 입력해주세요" required />

        <label>제품 설명</label>
        <textarea id="description" placeholder="제품 설명을 입력해주세요" required></textarea>
         
        <label>제품 사진</label>
          <span>사진을 업로드해주세요.</span>
          <label for="file" >
            <p>컴퓨터에서 선택</p>
          </label>
          <input type="file" name="file" id="file" />
        <div class="image-container">
        </div>

        <label>재고량</label>
        <input id="stock" placeholder="재고량을 입력해주세요" type="number"  required/>
        
        <label>가격</label>
        <input id="price" placeholder="가격을 입력해주세요" type="number"  required/>

        <button class="append-button" data-type="submit">추가하기</button>        
      </div>
    </div>`;
}

export function closeModal() {
  document
    .querySelector("body")
    .removeChild(document.querySelector("body").firstChild);
}
