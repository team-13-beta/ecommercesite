export const categoryAppendModal = `
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
      <button class="button primary category-append">추가하기</button>
      <button class="button close-button">취소하기</button>
    </footer>
  </div>
`;

export const categoryUpdateModal = (data) => {
  if (!data) return `<div>데이터가 없습니다.</div>`;
  return `<div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">카테고리 수정하기</p>
      <button class="delete" aria-label="close" data-type="modalClose"></button>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <label>카테고리 이름</label>
        <input class="category-input input" value="${data.name}" />
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button primary" data-type="categoryUpdate">수정하기</button>
      <button class="button" data-type="categoryDelete">삭제하기</button>
    </footer>
  </div>`;
};

export function productModal(categories = []) {
  return ` <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">상품 추가하기</p>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">상품명</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="productName"
                placeholder="상품명을 입력해주세요"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">카테고리</label>
            <div class="control">
              <div class="select full-select">
                <select id="categoryId" >
                  ${categories.reduce(
                    (acc, { id, name }) =>
                      (acc += `<option value=${id}>${name}</option>`),
                    "",
                  )}
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">제조사</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="companyName"
                placeholder="제조사를 입력해주세요"
              />
            </div>
          </div>
             
        <div class="field">
        <label class="label">제품 설명</label>
        <div class="control">
          <textarea class="textarea" id="summary" data-type="description"></textarea>
        </div>
      </div>
        <div class="field file-field">
          <label class="label">메인 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="title" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          <figure class="title-image"></figure>

          <label class="label">상세 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="detail" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          <figure class="detail-image"></figure>

          <label class="label">배달 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="delivery" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          <figure class="delivery-image"></figure>

          <label class="label">영양 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume"  data-type="nutrition"/>
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          <figure class="nutrition-image"></figure>
        </div>


        <div class="field">
          <label class="label">재고량</label>
          <div class="control">
            <input
              class="input"
              id="stock"
              placeholder="재고량을 입력해주세요"
              type="number"
              
            />
          </div>
        </div>

          <div class="field">
            <label class="label">가격</label>
            <div class="control">
              <input
                class="input"
                id="price"
                placeholder="가격을 입력해주세요"
                type="number"
                
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button primary append-button" data-type="submit">
            추가하기
          </button>
          <button class="button close-button" data-type="close">
            닫기
          </button>
        </footer>
      </div>
   `;
}

export function closeModal() {
  const $modal = document.querySelector(".modal");
  document.querySelector("body").removeChild($modal);
}
